import { Global, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Livro } from './entities/livro.entity';
import { LivroService } from './services/livro.service';
import { LivroController } from './controllers/livro.controller';
import { LivroRepository } from './repositories/livro.repository';
import { Usuario } from './entities/usuario.entity';
import { UsuarioService } from './services/usuario.service';
import { UsuarioController } from './controllers/usuario.controller';
import { UsuarioRepository } from './repositories/usuario.repository';

@Global()
@Module({
  imports: [MikroOrmModule.forFeature([Livro, Usuario])],
  providers: [LivroService, LivroRepository, UsuarioService, UsuarioRepository],
  controllers: [LivroController, UsuarioController],
  exports: [LivroService, LivroRepository, UsuarioService, UsuarioRepository],
})
export class BibliotecaModule {}
