export class ListaUsuariosDto {
  constructor(
    readonly nome: string,
    readonly email: string,
    readonly telefone: string,
  ) {}
}
