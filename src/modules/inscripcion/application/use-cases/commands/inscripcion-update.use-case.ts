import { Injectable } from '@nestjs/common';
import { InscripcionUpdateRequestDto } from '../../dtos/inscripcion-update-request.dto';
import { InscripcionUpdateResponseDto } from '../../dtos/inscripcion-update-response.dto';
import { InscripcionUpdateService } from '../../../domain/services/commands/inscripcion-update.service';
  
@Injectable()
export class InscripcionUpdateUseCase {
  constructor(private readonly service: InscripcionUpdateService) {}

  async execute(dto: InscripcionUpdateRequestDto & { id: number }): Promise<InscripcionUpdateResponseDto> {
    const entity = await this.service.execute({ id: dto.id, estado: dto.estado });
    return InscripcionUpdateResponseDto.fromEntity(entity);
  }
}