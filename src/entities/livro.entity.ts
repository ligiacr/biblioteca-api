import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/postgresql';
import { LivroRepository } from '../repositories/livro.repository';

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
}
