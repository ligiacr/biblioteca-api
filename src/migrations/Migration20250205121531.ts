import { Migration } from '@mikro-orm/migrations';

export class Migration20250205121531 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "livro" ("id" serial primary key, "titulo" varchar(255) not null, "autor" varchar(255) not null, "ano_publicacao" int not null, "disponivel" boolean not null, "estoque" int not null);`);

    this.addSql(`create table "usuario" ("id" serial primary key, "nome" varchar(255) not null, "email" varchar(255) not null, "telefone" varchar(255) not null);`);

    this.addSql(`create table "livro_usuarios" ("livro_id" int not null, "usuario_id" int not null, constraint "livro_usuarios_pkey" primary key ("livro_id", "usuario_id"));`);

    this.addSql(`alter table "livro_usuarios" add constraint "livro_usuarios_livro_id_foreign" foreign key ("livro_id") references "livro" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "livro_usuarios" add constraint "livro_usuarios_usuario_id_foreign" foreign key ("usuario_id") references "usuario" ("id") on update cascade on delete cascade;`);
  }

}
