import { Global, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Livro } from './entities/livro.entity';
import { LivroService } from './services/livro.service';
import { LivroController } from './controllers/livro.controller';
import { Usuario } from './entities/usuario.entity';
import { UsuarioService } from './services/usuario.service';
import { UsuarioController } from './controllers/usuario.controller';

@Global()
@Module({
  imports: [MikroOrmModule.forFeature([Livro, Usuario])],
  providers: [LivroService, UsuarioService],
  controllers: [LivroController, UsuarioController],
  exports: [LivroService, UsuarioService],
})
export class BibliotecaModule {}
