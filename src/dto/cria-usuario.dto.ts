import { IsEmail, IsInt, IsNotEmpty, MinLength } from 'class-validator';

export class CriaUsuarioDto {
  @IsInt({ message: 'O id deve ser um número inteiro' })
  id!: number;
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome!: string;
  @IsEmail(undefined, { message: 'O email deve ser válido' })
  @IsNotEmpty({ message: 'O email não pode ser vazio' })
  email!: string;
  @IsNotEmpty({ message: 'O telefone não pode ser vazio' })
  @MinLength(10, { message: 'O telefone deve ter no mínimo 10 dígitos' })
  telefone!: string;
}
