import {
  Entity,
  EntityRepositoryType,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { UsuarioRepository } from '../repositories/usuario.repository';
import { Livro } from './livro.entity';

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
  @ManyToMany({ entity: () => Livro, nullable: true })
  idLivro?: number;
}
