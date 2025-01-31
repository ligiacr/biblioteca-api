import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { UsuarioRepository } from 'src/repositories/usuario.repository';

@Entity({ repository: () => UsuarioRepository })
export class Usuario {
  [EntityRepositoryType]?: UsuarioRepository;

  @PrimaryKey()
  id!: number;
  @Property()
  nome!: string;
  @Property()
  email!: string;
  @Property()
  telefone!: string;
}
