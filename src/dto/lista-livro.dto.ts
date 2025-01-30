export class ListaLivroDto {
  constructor(
    readonly titulo: string,
    readonly autor: string,
    readonly anoPublicacao: number,
    readonly disponivel: boolean,
  ) {}
}
