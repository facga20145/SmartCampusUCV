import { Injectable } from '@nestjs/common';
import { ParticipacionCreateRequestDto } from '../../dtos/participacion-create-request.dto';
import { ParticipacionCreateResponseDto } from '../../dtos/participacion-create-response.dto';
import { ParticipacionCreateService } from '../../../domain/services/commands/participacion-create.service';
import { IParticipacionCreate } from '../../../domain/interfaces/participacion-create.interface';
  
@Injectable()
export class ParticipacionCreateUseCase {
  constructor(private readonly service: ParticipacionCreateService) {}

  async execute(dto: ParticipacionCreateRequestDto & { usuarioId: number }): Promise<ParticipacionCreateResponseDto> {
    const data: IParticipacionCreate = {
      usuarioId: dto.usuarioId,
      actividadId: dto.actividadId,
      asistencia: dto.asistencia,
      feedback: dto.feedback,
      puntos: dto.puntos,
    };
    const e = await this.service.execute(data);
    return ParticipacionCreateResponseDto.fromEntity(e);
  }
}