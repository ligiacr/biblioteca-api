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
    @Body() criaLivroDto: CriaLivroDto,
  ) {
    return this.livroService.atualizaLivro(id, criaLivroDto);
  }

  @Delete(':id')
  async excluiLivro(@Param('id', ParseIntPipe) id: number) {
    return this.livroService.excluiLivro(id);
  }

  @Post('/emprestar/:idUsuario/:id')
  async emprestaLivro(
    @Param('idUsuario', ParseIntPipe) idUsuario: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.livroService.emprestaLivro(idUsuario, id);
  }

  @Post('/devolver/:id')
  async devolveLivro(@Param('id', ParseIntPipe) id: number) {
    return this.livroService.devolveLivro(id);
  }
}
