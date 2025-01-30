import { Global, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Livro } from './entities/livro.entity';
import { LivroService } from './services/livro.service';
import { LivroController } from './controllers/livro.controller';
import { LivroRepository } from './repositories/livro.repository';

@Global()
@Module({
  imports: [MikroOrmModule.forFeature([Livro])],
  providers: [LivroService, LivroRepository],
  controllers: [LivroController],
  exports: [LivroService, LivroRepository],
})
export class BibliotecaModule {}
