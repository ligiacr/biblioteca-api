import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Livro } from 'src/entities/livro.entity';

@Injectable()
export class LivroRepository extends EntityRepository<Livro> {}
