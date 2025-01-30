import { EntityRepository } from '@mikro-orm/postgresql';
import { Livro } from 'src/entities/livro.entity';

export class LivroRepository extends EntityRepository<Livro> {}
