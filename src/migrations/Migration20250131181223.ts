import { Migration } from '@mikro-orm/migrations';

export class Migration20250131181223 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "livro_ids_usuarios" ("livro_id" int not null, "usuario_id" int not null, constraint "livro_ids_usuarios_pkey" primary key ("livro_id", "usuario_id"));`);

    this.addSql(`alter table "livro_ids_usuarios" add constraint "livro_ids_usuarios_livro_id_foreign" foreign key ("livro_id") references "livro" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "livro_ids_usuarios" add constraint "livro_ids_usuarios_usuario_id_foreign" foreign key ("usuario_id") references "usuario" ("id") on update cascade on delete cascade;`);

    this.addSql(`drop table if exists "livro_id_usuario" cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`create table "livro_id_usuario" ("livro_id" int not null, "usuario_id" int not null, constraint "livro_id_usuario_pkey" primary key ("livro_id", "usuario_id"));`);

    this.addSql(`alter table "livro_id_usuario" add constraint "livro_id_usuario_livro_id_foreign" foreign key ("livro_id") references "livro" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "livro_id_usuario" add constraint "livro_id_usuario_usuario_id_foreign" foreign key ("usuario_id") references "usuario" ("id") on update cascade on delete cascade;`);

    this.addSql(`drop table if exists "livro_ids_usuarios" cascade;`);
  }

}
