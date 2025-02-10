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
import { CriaUsuarioDto } from '../dto/cria-usuario.dto';
import { ListaUsuariosDto } from '../dto/lista-usuarios.dto';
import { UsuarioService } from '../services/usuario.service';

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
    @Body() listaUsuariosDto: ListaUsuariosDto,
  ) {
    return this.usuarioService.atualizaUsuario(id, listaUsuariosDto);
  }

  @Delete(':id')
  async excluiUsuario(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.excluiUsuario(id);
  }
}
