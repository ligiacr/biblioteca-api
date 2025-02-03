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
import { CriaUsuarioDto } from 'src/dto/cria-usuario.dto';
import { UsuarioService } from 'src/services/usuario.service';

@Controller('usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post()
  async criaUsuario(@Body() criaUsuarioDto: CriaUsuarioDto) {
    return this.usuarioService.criaUsuario(criaUsuarioDto);
  }

  @Get()
  async listaUsuarios() {
    return this.usuarioService.listaUsuarios();
  }

  @Get(':id')
  async buscaUsuarioPorId(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.buscaUsuarioPorId(id);
  }

  @Put(':id')
  async atualizaUsuario(
    @Param('id', ParseIntPipe) id: number,
    @Body() criaUsuarioDto: CriaUsuarioDto,
  ) {
    return this.usuarioService.atualizaUsuario(id, criaUsuarioDto);
  }

  @Delete(':id')
  async excluiUsuario(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.excluiUsuario(id);
  }
}
