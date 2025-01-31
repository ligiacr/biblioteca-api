import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CriaLivroDto } from 'src/dto/cria-livro.dto';
import { ListaLivrosDto } from 'src/dto/lista-livros.dto';
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
  async buscaLivroPorId(@Param('id', ParseIntPipe) id: number) {
    return this.livroService.buscaLivroPorId(id);
  }

  @Put(':id')
  async atualizaLivro(
    @Param('id', ParseIntPipe) id: number,
    @Body() livro: ListaLivrosDto,
  ) {
    return this.livroService.atualizaLivro(id, livro);
  }

  @Delete(':id')
  async excluiLivro(@Param('id', ParseIntPipe) id: number) {
    return this.livroService.excluiLivro(id);
  }
}
