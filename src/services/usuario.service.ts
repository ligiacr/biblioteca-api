import { EntityManager, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { CriaUsuarioDto } from 'src/dto/cria-usuario.dto';
import { ListaUsuariosDto } from 'src/dto/lista-usuarios.dto';
import { Usuario } from 'src/entities/usuario.entity';
import { BadRequestException } from 'src/exceptions/bad-request.exception';
import { NotFoundException } from 'src/exceptions/not-found.exception';
import { UsuarioRepository } from 'src/repositories/usuario.repository';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: UsuarioRepository,
    private readonly em: EntityManager,
  ) {}

  async criaUsuario(criaUsuarioDto: CriaUsuarioDto): Promise<Usuario | null> {
    const usuario = new Usuario();
    wrap(usuario).assign(criaUsuarioDto);
    const existe = (await this.usuarioRepository.findAll()).filter(
      (usuario) => usuario.id === criaUsuarioDto.id,
    );
    if (existe.length === 0) {
      await this.usuarioRepository.insert(usuario);
      await this.em.flush();
    } else {
      throw new BadRequestException();
    }
    return this.usuarioRepository.findOne(usuario.id);
  }

  async listaUsuarios() {
    const usuarios = await this.usuarioRepository.findAll();
    if (usuarios.length > 0) {
      const lista = usuarios.map(
        (usuario) =>
          new ListaUsuariosDto(usuario.nome, usuario.email, usuario.telefone),
      );
      return lista;
    }
    throw new NotFoundException();
  }

  async buscaUsuarioPorId(id: number): Promise<Usuario | null> {
    const usuario = await this.usuarioRepository.findOne(id);
    if (!usuario) {
      throw new NotFoundException();
    }
    return usuario;
  }

  async atualizaUsuario(id: number, listaUsuarioDto: ListaUsuariosDto) {
    const usuario = await this.usuarioRepository.findOne(id);
    if (!usuario) {
      throw new NotFoundException();
    }
    wrap(usuario).assign(listaUsuarioDto);
    await this.em.flush();
    return usuario;
  }

  async excluiUsuario(id: number) {
    const usuario = await this.usuarioRepository.findOne(id);
    if (!usuario) {
      throw new NotFoundException();
    }
    await this.usuarioRepository.nativeDelete(id);
    return usuario;
  }
}
