import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Usuario } from 'src/entities/usuario.entity';

@Injectable()
export class UsuarioRepository extends EntityRepository<Usuario> {}
