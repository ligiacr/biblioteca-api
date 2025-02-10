/* eslint-disable @typescript-eslint/unbound-method */
import { BibliotecaModule } from './../../src/biblioteca.module';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { Livro } from '../../src/entities/livro.entity';
import { LivroService } from '../../src/services/livro.service';
import { UsuarioRepository } from '../../src/repositories/usuario.repository';
import { Usuario } from '../../src/entities/usuario.entity';
import { LivroRepository } from '../../src/repositories/livro.repository';
import { UsuarioService } from '../../src/services/usuario.service';

const livrosLista: Livro[] = [
  new Livro({
    id: 1,
    titulo: 'Livro 1',
    autor: 'Autor 1',
    anoPublicacao: 2000,
    disponivel: true,
    estoque: 10,
  }),
  new Livro({
    id: 2,
    titulo: 'Livro 2',
    autor: 'Autor 2',
    anoPublicacao: 2010,
    disponivel: true,
    estoque: 10,
  }),
  new Livro({
    id: 3,
    titulo: 'Livro 3',
    autor: 'Autor 3',
    anoPublicacao: 2012,
    disponivel: true,
    estoque: 10,
  }),
];

describe('LivroService', () => {
  let livroService: LivroService;
  let livroRepository: LivroRepository;
  let usuarioRepository: UsuarioRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BibliotecaModule],
      providers: [
        LivroService,
        UsuarioService,
        {
          provide: getRepositoryToken(Livro),
          useValue: {
            criaLivro: jest.fn().mockResolvedValue(livrosLista),
            listaLivros: jest.fn().mockResolvedValue(livrosLista),
            buscaLivroPorId: jest.fn().mockResolvedValue(livrosLista),
            atualizaLivro: jest.fn().mockResolvedValue(livrosLista),
            excluiLivro: jest.fn().mockResolvedValue(livrosLista),
            emprestaLivro: jest.fn().mockResolvedValue(livrosLista),
            devolveLivro: jest.fn().mockResolvedValue(livrosLista),
          },
        },
        LivroRepository,
        UsuarioRepository,
      ],
    }).compile();

    livroService = module.get<LivroService>(LivroService);
    livroRepository = module.get<LivroRepository>(getRepositoryToken(Livro));
    usuarioRepository = module.get<UsuarioRepository>(
      getRepositoryToken(Usuario),
    );
  });

  it('verifica se o valor não será undefined', () => {
    expect(livroService).toBeDefined();
    expect(livroRepository).toBeDefined();
    expect(usuarioRepository).toBeDefined();
  });

  describe('listaLivros', () => {
    it('deve retornar uma lista de livros', async () => {
      const result = await livroService.listaLivros();
      expect(result).toEqual(livrosLista);
      expect(livroRepository.findAll).toHaveBeenCalledTimes(1);
    });

    describe('buscaLivroPorId', () => {
      it('deve retornar um livro por id', async () => {
        const result = await livroService.buscaLivroPorId(1);
        expect(result).toEqual(livrosLista[0]);
      });
    });
  });
});
