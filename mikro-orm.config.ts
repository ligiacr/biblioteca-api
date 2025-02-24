import { defineConfig } from '@mikro-orm/core';
import { TSMigrationGenerator } from '@mikro-orm/migrations';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import * as path from 'path';
import 'dotenv/config';

export default defineConfig({
  port: 5432,
  user: process.env['DB_USER']!,
  password: process.env['DB_PASSWORD']!,
  host: 'localhost',
  dbName: process.env['DB_NAME']!,
  driver: PostgreSqlDriver,
  allowGlobalContext: true,
  entities: ['./dist/entities'],
  entitiesTs: ['./src/entities'],
  tsNode: true,
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
