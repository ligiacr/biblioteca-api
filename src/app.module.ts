import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BibliotecaModule } from './biblioteca.module';
import 'dotenv/config';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: ['./dist/entities'],
      entitiesTs: ['./src/entities'],
      dbName: process.env['DB_NAME']!,
      driver: PostgreSqlDriver,
      host: 'localhost',
      port: 5432,
      user: process.env['DB_USER']!,
      password: process.env['DB_PASSWORD']!,
      autoLoadEntities: true,
    }),
    BibliotecaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
