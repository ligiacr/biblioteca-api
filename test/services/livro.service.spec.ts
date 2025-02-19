import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { Livro } from '../../src/entities/livro.entity';
import { LivroService } from '../../src/services/livro.service';
import { Usuario } from '../../src/entities/usuario.entity';
import { UsuarioService } from '../../src/services/usuario.service';
import { Collection, EntityManager } from '@mikro-orm/core';
import { SqlEntityManager } from '@mikro-orm/postgresql';
import { ListaLivrosDto } from '../../src/dto/lista-livros.dto';
import { CriaLivroDto } from '../../src/dto/cria-livro.dto';

const usuariosLista: Usuario[] = [
  new Usuario({
    id: 1,
    nome: 'Joaquina',
    email: 'joaquina@email.com',
    telefone: '1234567890',
  }),
  new Usuario({
    id: 2,
    nome: 'Maria',
    email: 'maria@email.com',
    telefone: '1234567891',
  }),
  new Usuario({
    id: 3,
    nome: 'João',
    email: 'joao@email.com',
    telefone: '1234567892',
  }),
];

const livrosLista: Livro[] = [
  new Livro({
    id: 1,
    titulo: 'Livro 1',
    autor: 'Autor 1',
    anoPublicacao: 2000,
    disponivel: true,
    estoque: 10,
    usuarios: new Collection<Usuario>(usuariosLista),
  }),
  new Livro({
    id: 2,
    titulo: 'Livro 2',
    autor: 'Autor 2',
    anoPublicacao: 2010,
    disponivel: true,
    estoque: 10,
    usuarios: new Collection<Usuario>(usuariosLista),
  }),
  new Livro({
    id: 3,
    titulo: 'Livro 3',
    autor: 'Autor 3',
    anoPublicacao: 2012,
    disponivel: true,
    estoque: 10,
    usuarios: new Collection<Usuario>(usuariosLista),
  }),
];

const mockCriaLivrosDto = new CriaLivroDto({
  id: 4,
  titulo: 'Livro 4',
  autor: 'Autor 4',
  anoPublicacao: 2000,
  disponivel: true,
  estoque: 10,
  usuarios: new Collection<Usuario>(usuariosLista),
});

const mockListaLivrosDto = new ListaLivrosDto({
  titulo: 'Livro 1 atualizado',
  autor: 'Autor 1',
  anoPublicacao: 2000,
  disponivel: true,
  estoque: 10,
  usuarios: new Collection<Usuario>(usuariosLista),
});

describe('LivroService', () => {
  let livroService: LivroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LivroService,
        UsuarioService,
        {
          provide: getRepositoryToken(Livro),
          useValue: {
            insert: jest.fn().mockResolvedValue(livrosLista),
            findAll: jest.fn().mockResolvedValue(livrosLista),
            findOne: jest.fn().mockResolvedValue(livrosLista[0]),
            nativeDelete: jest.fn().mockResolvedValue(livrosLista),
          },
        },
        {
          provide: getRepositoryToken(Usuario),
          useValue: {
            insert: jest.fn().mockResolvedValue(usuariosLista),
            findAll: jest.fn().mockResolvedValue(usuariosLista),
            findOne: jest.fn().mockResolvedValue(usuariosLista[0]),
            nativeDelete: jest.fn().mockResolvedValue(usuariosLista),
          },
        },
        {
          provide: EntityManager,
          useValue: {
            query: jest.fn(),
            flush: jest.fn(),
          },
        },
        {
          provide: SqlEntityManager,
          useValue: {
            query: jest.fn(),
            flush: jest.fn(),
          },
        },
        ListaLivrosDto,
      ],
    }).compile();

    livroService = module.get<LivroService>(LivroService);
  });

  it('verifica se o valor não será undefined', () => {
    expect(livroService).toBeDefined();
  });

  describe('criaLivro', () => {
    it('deve retornar um livro criado', async () => {
      const result = await livroService.criaLivro(mockCriaLivrosDto);
      expect(result).toEqual(livrosLista[0]);
    });
  });

  describe('listaLivros', () => {
    it('deve retornar uma lista de livros', async () => {
      const result = await livroService.listaLivros();
      expect(result).toEqual(livrosLista);
      expect(result).toHaveBeenCalledTimes(1);
    });

    describe('buscaLivroPorId', () => {
      it('deve retornar um livro por id', async () => {
        const result = await livroService.buscaLivroPorId(1);
        expect(result).toEqual(livrosLista[0]);
      });

      describe('atualizaLivro', () => {
        it('deve retornar um livro atualizado', async () => {
          const result = await livroService.atualizaLivro(
            1,
            mockListaLivrosDto,
          );
          expect(result).toEqual(expect.objectContaining(mockListaLivrosDto));
        });

        describe('excluiLivro', () => {
          it('deve retornar um livro excluído', async () => {
            const result = await livroService.excluiLivro(1);
            expect(result).toEqual(livrosLista[0]);
          });
        });
      });
    });
  });
});
