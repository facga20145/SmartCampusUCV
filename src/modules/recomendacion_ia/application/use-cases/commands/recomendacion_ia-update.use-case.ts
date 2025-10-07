import { Injectable } from '@nestjs/common';
import { RecomendacionIaUpdateRequestDto } from '../../dtos/recomendacion_ia-update-request.dto';
import { RecomendacionIaUpdateResponseDto } from '../../dtos/recomendacion_ia-update-response.dto';
import { Recomendacion_iaUpdateService } from '../../../domain/services/commands/recomendacion_ia-update.service';

@Injectable()
export class RecomendacionIaUpdateUseCase {
  constructor(private readonly recomendacionIaUpdateService: Recomendacion_iaUpdateService) {}

  async execute(dto: RecomendacionIaUpdateRequestDto & { id: number }): Promise<RecomendacionIaUpdateResponseDto> {
    const recomendacion = await this.recomendacionIaUpdateService.execute(dto);
    return RecomendacionIaUpdateResponseDto.fromEntity(recomendacion);
  }
}