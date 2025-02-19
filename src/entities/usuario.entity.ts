import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/postgresql';

@Entity({ repository: () => EntityRepository<Usuario> })
export class Usuario {
  [EntityRepositoryType]?: EntityRepository<Usuario>;

  @PrimaryKey()
  id!: number;
  @Property()
  nome!: string;
  @Property()
  email!: string;
  @Property()
  telefone!: string;

  constructor(usuario?: Partial<Usuario>) {
    this.id = usuario?.id ?? 0;
    this.nome = usuario?.nome ?? '';
    this.email = usuario?.email ?? '';
    this.telefone = usuario?.telefone ?? '';
  }
}
