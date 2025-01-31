import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor() {
    super(
      'Solicitação inválida! Verifique os dados e tente novamente.',
      HttpStatus.BAD_REQUEST,
    );
  }
}
