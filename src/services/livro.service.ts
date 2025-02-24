import { CriaLivroDto } from './../dto/cria-livro.dto';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { ListaLivrosDto } from '../dto/lista-livros.dto';
import { Livro } from '../entities/livro.entity';
import { BadRequestException } from '../exceptions/bad-request.exception';
import { NotFoundException } from '../exceptions/not-found.exception';
import { Usuario } from '../entities/usuario.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import winston from 'winston';
const { combine, timestamp, json, prettyPrint } = winston.format;
import { PostgresTransport } from '@innova2/winston-pg';

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
  ) {}

  logger: winston.Logger = winston.createLogger({
    level: 'info' as string,
    format: combine(
      timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
      json(),
      prettyPrint(),
    ),
    defaultMeta: { service: 'livro-service' },
    transports: [
      new winston.transports.Console(),
      new PostgresTransport({
        connectionString: 'postgres://postgres:123456@localhost:5432/postgres',
        maxPool: 10,
        level: 'info',
        tableName: 'logs',
      }),
    ],
  });

  async criaLivro(criaLivroDto: CriaLivroDto): Promise<Livro | null> {
    this.logger.info('Criando livro...');
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
      this.logger.warn('Já existe um livro com este id!');
      throw new BadRequestException();
    }
    this.logger.info('Livro criado com sucesso!');
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
      this.logger.info('Trazendo lista de livros...');
      await Promise.all(livros.map((livro) => livro.usuarios.init()));
      this.logger.info('Lista de livros retornada com sucesso!');
      return lista;
    }
    this.logger.warn('Nenhum livro encontrado!');
    throw new NotFoundException();
  }

  async buscaLivroPorId(id: number): Promise<Livro | null> {
    this.logger.info(`Buscando livro com id ${id}...`);
    const livro = await this.livroRepository.findOne(id);

    if (!livro) {
      this.logger.warn('Livro nao encontrado!');
      throw new NotFoundException();
    }
    this.logger.info('Livro encontrado!');
    return livro;
  }

  async atualizaLivro(id: number, listaLivrosDto: ListaLivrosDto) {
    this.logger.info(`Atualizando livro com id ${id}...`);
    const livro = await this.livroRepository.findOne(id);

    if (!livro) {
      this.logger.warn('Livro nao encontrado!');
      throw new NotFoundException();
    }
    wrap(livro).assign(listaLivrosDto);
    await this.em.flush();
    this.logger.info('Livro atualizado com sucesso!');
    return livro;
  }

  async excluiLivro(id: number) {
    const livro = await this.livroRepository.findOne(id);

    if (!livro) {
      this.logger.warn('Livro nao encontrado!');
      throw new NotFoundException();
    }
    this.logger.info(`Excluindo livro com id ${id}...`);
    await this.livroRepository.nativeDelete(id);
    this.logger.info('Livro excluido com sucesso!');
    return livro;
  }

  async emprestaLivro(usuarioId: number, id: number) {
    this.logger.info(`Emprestando livro com id ${id}...`);
    const livro = await this.livroRepository.findOne(id);
    const usuario = await this.usuarioRepository.findOne(usuarioId);

    if (!livro || !usuario) {
      this.logger.warn('Livro ou usuario nao encontrado!');
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
      this.logger.warn('Livro indisponivel!');
      throw new BadRequestException();
    }

    livro.usuarios.add(usuario);
    if (livro.estoque === 0) {
      livro.disponivel = false;
    }
    await livro?.usuarios.init();
    await this.em.flush();
    this.logger.info('Livro emprestado com sucesso!');
    return livro;
  }

  async devolveLivro(usuarioId: number, id: number) {
    this.logger.info(`Devolvendo livro com id ${id}...`);
    const livro = await this.livroRepository.findOne(id);
    const usuario = await this.usuarioRepository.findOne(usuarioId);

    if (!livro || !usuario) {
      this.logger.warn('Livro ou usuario nao encontrado!');
      throw new NotFoundException();
    }
    await livro?.usuarios.init();

    if (!livro.usuarios.contains(usuario)) {
      this.logger.warn('O livro nao foi emprestado para este usuario!');
      throw new BadRequestException();
    }
    livro.usuarios.remove(usuario);
    livro.estoque += 1;
    livro.disponivel = true;
    await this.em.flush();
    this.logger.info('Livro devolvido com sucesso!');
    return livro;
  }
}
