import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BibliotecaModule } from './biblioteca.module';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: ['./dist/entities'],
      entitiesTs: ['./src/entities'],
      dbName: 'postgres',
      driver: PostgreSqlDriver,
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: '123456',
      autoLoadEntities: true,
    }),
    BibliotecaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
