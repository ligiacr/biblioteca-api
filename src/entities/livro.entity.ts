import {
  Entity,
  EntityRepositoryType,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/postgresql';
import { LivroRepository } from '../repositories/livro.repository';
import { Usuario } from './usuario.entity';

@Entity({ repository: () => LivroRepository })
export class Livro {
  [EntityRepositoryType]?: LivroRepository;

  @PrimaryKey()
  id!: number;
  @Property()
  titulo!: string;
  @Property()
  autor!: string;
  @Property()
  anoPublicacao!: number;
  @Property()
  disponivel!: boolean;
  @ManyToMany({ entity: () => Usuario, nullable: true, owner: true })
  idUsuario?: number;
}
