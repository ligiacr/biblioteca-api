import { Collection } from '@mikro-orm/core';
import { Usuario } from 'src/entities/usuario.entity';

export class ListaLivrosDto {
  constructor(
    readonly titulo: string,
    readonly autor: string,
    readonly anoPublicacao: number,
    readonly disponivel: boolean,
    readonly estoque: number,
    readonly usuarios: Collection<Usuario>,
  ) {}
}
