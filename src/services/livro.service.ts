import { CriaLivroDto } from './../dto/cria-livro.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, wrap } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { ListaLivroDto } from 'src/dto/lista-livro.dto';
import { Livro } from 'src/entities/livro.entity';
import { LivroRepository } from 'src/repositories/livro.repository';

@Injectable()
export class LivroService {
  constructor(
    @InjectRepository(Livro)
    private readonly livroRepository: LivroRepository,
    private readonly em: EntityManager,
  ) {}

  async criaLivro(criaLivroDto: CriaLivroDto): Promise<Livro | null> {
    const livro = new Livro();
    wrap(livro).assign(criaLivroDto);
    await this.livroRepository.insert(livro);
    await this.em.flush();
    return this.livroRepository.findOne(livro.id);
  }

  async listaLivros(): Promise<Livro[]> {
    const livros = await this.livroRepository.findAll();
    if (livros.length > 0) {
      return livros;
    }
    throw new Error('Não há livros cadastrados.)');
  }

  async buscaLivroPorId(id: number): Promise<Livro | null> {
    const livro = await this.livroRepository.findOne(id);
    if (!livro) {
      throw new Error('Livro não encontrado.');
    }
    return livro;
  }

  async atualizaLivro(id: number, livroDto: ListaLivroDto) {
    const livro = await this.livroRepository.findOne(id);
    if (!livro) {
      throw new Error('Livro não encontrado.');
    }
    wrap(livro).assign(livroDto);
    await this.em.flush();
    return livro;
  }

  async excluiLivro(id: number) {
    const livro = await this.livroRepository.findOne(id);
    if (!livro) {
      throw new Error('Livro não encontrado.');
    }
    await this.livroRepository.nativeDelete(id);
    return livro;
  }
}
