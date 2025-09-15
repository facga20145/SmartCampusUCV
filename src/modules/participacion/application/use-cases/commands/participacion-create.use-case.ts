import { Injectable } from '@nestjs/common';
import { ParticipacionCreateRequestDto } from '../../dtos/participacion-create-request.dto';
import { ParticipacionCreateResponseDto } from '../../dtos/participacion-create-response.dto';
import { ParticipacionCreateService } from '../../../domain/services/commands/participacion-create.service';
  
@Injectable()
export class ParticipacionCreateUseCase {
  constructor(private readonly service: ParticipacionCreateService) {}

  async execute(dto: ParticipacionCreateRequestDto): Promise<ParticipacionCreateResponseDto> {
    const e = await this.service.execute(dto);
    return ParticipacionCreateResponseDto.fromEntity(e);
  }
}