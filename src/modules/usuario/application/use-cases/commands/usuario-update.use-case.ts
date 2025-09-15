import { Injectable } from '@nestjs/common';
import { UsuarioUpdateRequestDto } from '../../dtos/usuario-update-request.dto';
import { UsuarioUpdateResponseDto } from '../../dtos/usuario-update-response.dto';
import { UsuarioUpdateService } from '../../../domain/services/commands/usuario-update.service';

@Injectable()
export class UsuarioUpdateUseCase {
  constructor(private readonly usuarioUpdateService: UsuarioUpdateService) {}

  async execute(dto: UsuarioUpdateRequestDto & { id: number }): Promise<UsuarioUpdateResponseDto> {
    const usuario = await this.usuarioUpdateService.execute(dto);
    return UsuarioUpdateResponseDto.fromEntity(usuario);
  }
}