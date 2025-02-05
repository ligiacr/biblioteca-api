import { CriaLivroDto } from './../dto/cria-livro.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, wrap } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { ListaLivrosDto } from 'src/dto/lista-livros.dto';
import { Livro } from 'src/entities/livro.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { BadRequestException } from 'src/exceptions/bad-request.exception';
import { NotFoundException } from 'src/exceptions/not-found.exception';
import { LivroRepository } from 'src/repositories/livro.repository';
import { UsuarioRepository } from 'src/repositories/usuario.repository';

@Injectable()
export class LivroService {
  constructor(
    @InjectRepository(Livro)
    private readonly livroRepository: LivroRepository,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: UsuarioRepository,
    private readonly em: EntityManager,
  ) {}

  async criaLivro(criaLivroDto: CriaLivroDto): Promise<Livro | null> {
    const livro = new Livro();

    wrap(livro).assign(criaLivroDto);
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
      const lista = livros.map(
        (livro) =>
          new ListaLivrosDto(
            livro.titulo,
            livro.autor,
            livro.anoPublicacao,
            livro.disponivel,
            livro.estoque,
            livro.usuarios,
          ),
      );
      await Promise.all(livros.map((livro) => livro.usuarios.init()));
      return lista;
    }
    throw new NotFoundException();
  }

  async buscaLivroPorId(id: number): Promise<Livro | null> {
    const livro = await this.livroRepository.findOne(id);

    if (!livro) {
      throw new NotFoundException();
    }
    return livro;
  }

  async atualizaLivro(id: number, criaLivroDto: CriaLivroDto) {
    const livro = await this.livroRepository.findOne(id);

    if (!livro) {
      throw new NotFoundException();
    }
    wrap(livro).assign(criaLivroDto);
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
