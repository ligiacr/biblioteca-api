import { Migration } from '@mikro-orm/migrations';

export class Migration20250130183228 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "livro" ("id" serial primary key, "titulo" varchar(255) not null, "autor" varchar(255) not null, "ano_publicacao" int not null, "disponivel" boolean not null);`);
  }

}
