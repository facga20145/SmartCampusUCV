import { Injectable } from '@nestjs/common';
import { InscripcionCreateRequestDto } from '../../dtos/inscripcion-create-request.dto';
import { InscripcionCreateResponseDto } from '../../dtos/inscripcion-create-response.dto';
import { InscripcionCreateService } from '../../../domain/services/commands/inscripcion-create.service';
  
@Injectable()
export class InscripcionCreateUseCase {
  constructor(private readonly service: InscripcionCreateService) {}

  async execute(dto: InscripcionCreateRequestDto): Promise<InscripcionCreateResponseDto> {
    const entity = await this.service.execute({
      usuarioId: dto.usuarioId,
      actividadId: dto.actividadId,
    });
    return InscripcionCreateResponseDto.fromEntity(entity);
  }
}