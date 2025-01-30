import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CriaLivroDto } from 'src/dto/cria-livro.dto';
import { ListaLivroDto } from 'src/dto/lista-livro.dto';
import { LivroService } from 'src/services/livro.service';

@Controller('livros')
export class LivroController {
  constructor(private livroService: LivroService) {}

  @Post()
  async criaLivro(@Body() criaLivroDto: CriaLivroDto) {
    return this.livroService.criaLivro(criaLivroDto);
  }

  @Get()
  async listaLivros() {
    return this.livroService.listaLivros();
  }

  @Get(':id')
  async buscaLivroPorId(id: number) {
    return this.livroService.buscaLivroPorId(id);
  }

  @Put(':id')
  async atualizaLivro(id: number, livroDto: ListaLivroDto) {
    return this.livroService.atualizaLivro(id, livroDto);
  }

  @Delete(':id')
  async excluiLivro(id: number) {
    return this.livroService.excluiLivro(id);
  }
}
