import { defineConfig } from '@mikro-orm/core';
import { TSMigrationGenerator } from '@mikro-orm/migrations';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import * as path from 'path';

export default defineConfig({
  port: 5432,
  user: 'postgres',
  host: 'localhost',
  dbName: 'postgres',
  driver: PostgreSqlDriver,
  password: '123456',
  allowGlobalContext: true,
  entities: ['./dist/entities'],
  entitiesTs: ['./src/entities'],
  migrations: {
    path: path.resolve(__dirname, './src/migrations'),
    tableName: 'mikro_orm_migrations',
    pathTs: 'src/migrations',
    glob: '!(*.d).{js,ts}',
    transactional: true,
    emit: 'ts',
    generator: TSMigrationGenerator,
  },
});
