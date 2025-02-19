import { Global, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Livro } from './entities/livro.entity';
import { LivroService } from './services/livro.service';
import { LivroController } from './controllers/livro.controller';
import { Usuario } from './entities/usuario.entity';
import { UsuarioService } from './services/usuario.service';
import { UsuarioController } from './controllers/usuario.controller';
import { LoggerModule } from 'nestjs-pino';

@Global()
@Module({
  imports: [
    MikroOrmModule.forFeature([Livro, Usuario]),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            messageKey: 'message',
          },
        },
        messageKey: 'message',
        autoLogging: false,
        serializers: {
          req: () => {
            return undefined;
          },
          res: () => {
            return undefined;
          },
        },
      },
    }),
  ],
  providers: [LivroService, UsuarioService],
  controllers: [LivroController, UsuarioController],
  exports: [LivroService, UsuarioService],
})
export class BibliotecaModule {}
