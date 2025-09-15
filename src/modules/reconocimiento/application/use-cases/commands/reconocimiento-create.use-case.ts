import { Injectable } from '@nestjs/common';
import { ReconocimientoCreateRequestDto } from '../../dtos/reconocimiento-create-request.dto';
import { ReconocimientoCreateResponseDto } from '../../dtos/reconocimiento-create-response.dto';
import { ReconocimientoCreateService } from '../../../domain/services/commands/reconocimiento-create.service';
  
@Injectable()
export class ReconocimientoCreateUseCase {
  constructor(private readonly service: ReconocimientoCreateService) {}

  async execute(dto: ReconocimientoCreateRequestDto): Promise<ReconocimientoCreateResponseDto> {
    const e = await this.service.execute(dto);
    return ReconocimientoCreateResponseDto.fromEntity(e);
  }
}