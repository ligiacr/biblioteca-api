import { Collection } from '@mikro-orm/core';
import { IsInt, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { Usuario } from 'src/entities/usuario.entity';

export class CriaLivroDto {
  @IsInt({ message: 'O id deve ser um número inteiro' })
  id!: number;
  @IsNotEmpty({ message: 'O titulo não pode ser vazio' })
  titulo!: string;
  @IsNotEmpty({ message: 'O autor não pode ser vazio' })
  autor!: string;
  @IsInt({ message: 'O ano de publicação deve ser um número' })
  anoPublicacao!: number;
  @IsBoolean()
  disponivel!: boolean;
  @IsInt({ message: 'O estoque deve ser um número' })
  estoque!: number;
  @IsOptional()
  usuarios = new Collection<Usuario>(this);

  constructor(livro?: Partial<CriaLivroDto>) {
    this.id = livro?.id ?? 0;
    this.titulo = livro?.titulo ?? '';
    this.autor = livro?.autor ?? '';
    this.anoPublicacao = livro?.anoPublicacao ?? 0;
    this.disponivel = livro?.disponivel ?? true;
    this.estoque = livro?.estoque ?? 0;
    this.usuarios = livro?.usuarios ?? new Collection<Usuario>(this);
  }
}
