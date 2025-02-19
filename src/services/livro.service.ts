import { CriaLivroDto } from './../dto/cria-livro.dto';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { ListaLivrosDto } from '../dto/lista-livros.dto';
import { Livro } from '../entities/livro.entity';
import { BadRequestException } from '../exceptions/bad-request.exception';
import { NotFoundException } from '../exceptions/not-found.exception';
import { Usuario } from '../entities/usuario.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Logger } from 'nestjs-pino';

@Injectable()
export class UsuarioService {}

@Injectable()
export class LivroService {
  constructor(
    @InjectRepository(Livro)
    private readonly livroRepository: EntityRepository<Livro>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: EntityRepository<Usuario>,
    private readonly em: EntityManager,
    private readonly logger: Logger,
  ) {}

  async criaLivro(criaLivroDto: CriaLivroDto): Promise<Livro | null> {
    const livro = new Livro();

    livro.id = criaLivroDto.id;
    livro.titulo = criaLivroDto.titulo;
    livro.autor = criaLivroDto.autor;
    livro.anoPublicacao = criaLivroDto.anoPublicacao;
    livro.disponivel = criaLivroDto.disponivel;
    livro.estoque = criaLivroDto.estoque;
    livro.usuarios = criaLivroDto.usuarios;

    const existe = (await this.livroRepository.findAll()).filter(
      (livro) => livro.id === criaLivroDto.id,
    );
    if (existe.length === 0) {
      await this.livroRepository.insert(livro);
      await this.em.flush();
    } else {
      throw new BadRequestException();
    }
    return this.livroRepository.findOne(livro.id);
  }

  async listaLivros() {
    const livros = await this.livroRepository.findAll();

    if (livros.length > 0) {
      const lista = livros.map((livro) => [
        {
          titulo: livro.titulo,
          autor: livro.autor,
          anoPublicacao: livro.anoPublicacao,
          disponivel: livro.disponivel,
          estoque: livro.estoque,
          usuarios: livro.usuarios,
        },
      ]);
      this.logger.log('Trazendo lista de livros...');
      await Promise.all(livros.map((livro) => livro.usuarios.init()));
      return lista;
    }
    this.logger.warn('Nenhum livro encontrado!');
    throw new NotFoundException();
  }

  async buscaLivroPorId(id: number): Promise<Livro | null> {
    this.logger.log(`Buscando livro com id ${id}...`);
    const livro = await this.livroRepository.findOne(id);

    if (!livro) {
      this.logger.warn('Livro nao encontrado!');
      throw new NotFoundException();
    }
    return livro;
  }

  async atualizaLivro(id: number, listaLivrosDto: ListaLivrosDto) {
    const livro = await this.livroRepository.findOne(id);

    if (!livro) {
      throw new NotFoundException();
    }
    wrap(livro).assign(listaLivrosDto);
    await this.em.flush();
    return livro;
  }

  async excluiLivro(id: number) {
    const livro = await this.livroRepository.findOne(id);

    if (!livro) {
      throw new NotFoundException();
    }
    await this.livroRepository.nativeDelete(id);
    return livro;
  }

  async emprestaLivro(usuarioId: number, id: number) {
    const livro = await this.livroRepository.findOne(id);
    const usuario = await this.usuarioRepository.findOne(usuarioId);

    if (!livro || !usuario) {
      throw new NotFoundException();
    }
    await livro?.usuarios.init();

    if (
      livro.disponivel &&
      livro.estoque > 0 &&
      !livro.usuarios.contains(usuario)
    ) {
      livro.estoque -= 1;
    } else {
      throw new BadRequestException();
    }

    livro.usuarios.add(usuario);
    if (livro.estoque === 0) {
      livro.disponivel = false;
    }
    await livro?.usuarios.init();
    await this.em.flush();

    return livro;
  }

  async devolveLivro(usuarioId: number, id: number) {
    const livro = await this.livroRepository.findOne(id);
    const usuario = await this.usuarioRepository.findOne(usuarioId);

    if (!livro || !usuario) {
      throw new NotFoundException();
    }
    await livro?.usuarios.init();

    if (!livro.usuarios.contains(usuario)) {
      throw new BadRequestException();
    }
    livro.usuarios.remove(usuario);
    livro.estoque += 1;
    livro.disponivel = true;
    await this.em.flush();
    return livro;
  }
}
