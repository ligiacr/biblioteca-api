import { Migration } from '@mikro-orm/migrations';

export class Migration20250131133012 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "usuario" ("id" serial primary key, "nome" varchar(255) not null, "email" varchar(255) not null, "telefone" varchar(255) not null);`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "usuario" cascade;`);
  }

}
