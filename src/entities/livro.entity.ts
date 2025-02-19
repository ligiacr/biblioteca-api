import {
  Collection,
  Entity,
  EntityRepository,
  EntityRepositoryType,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/postgresql';
import { Usuario } from './usuario.entity';

@Entity({ repository: () => EntityRepository<Livro> })
export class Livro {
  [EntityRepositoryType]?: EntityRepository<Livro>;

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
  @Property()
  estoque!: number;
  @ManyToMany(() => Usuario)
  usuarios: Collection<Usuario> = new Collection<Usuario>(this);

  constructor(livro?: Partial<Livro>) {
    this.id = livro?.id ?? 0;
    this.titulo = livro?.titulo ?? '';
    this.autor = livro?.autor ?? '';
    this.anoPublicacao = livro?.anoPublicacao ?? 0;
    this.disponivel = livro?.disponivel ?? true;
    this.estoque = livro?.estoque ?? 0;
    this.usuarios = livro?.usuarios ?? new Collection<Usuario>(this);
  }
}
