export class ListaLivrosDto {
  constructor(
    readonly titulo: string,
    readonly autor: string,
    readonly anoPublicacao: number,
    readonly disponivel: boolean,
    readonly idsUsuarios: number,
  ) {}
}
