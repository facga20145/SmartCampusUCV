import { Injectable } from '@nestjs/common';
import { ParticipacionUpdateRequestDto } from '../../dtos/participacion-update-request.dto';
import { ParticipacionUpdateResponseDto } from '../../dtos/participacion-update-response.dto';
import { ParticipacionUpdateService } from '../../../domain/services/commands/participacion-update.service';
  
@Injectable()
export class ParticipacionUpdateUseCase {
  constructor(private readonly service: ParticipacionUpdateService) {}

  async execute(dto: ParticipacionUpdateRequestDto): Promise<ParticipacionUpdateResponseDto> {
    const e = await this.service.execute(dto);
    return ParticipacionUpdateResponseDto.fromEntity(e);
  }
}