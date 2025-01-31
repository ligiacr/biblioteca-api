import { IsEmail, IsInt, IsString } from 'class-validator';

export class CriaUsuarioDto {
  @IsInt()
  id!: number;
  @IsString()
  nome!: string;
  @IsEmail()
  email!: string;
  @IsString()
  telefone!: string;
}
