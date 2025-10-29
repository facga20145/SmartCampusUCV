import { Injectable } from '@nestjs/common';
import { InscripcionCreateResponseDto } from '../../dtos/inscripcion-create-response.dto';
import { InscripcionCreateService } from '../../../domain/services/commands/inscripcion-create.service';
import { IInscripcionCreate } from '../../../domain/interfaces/inscripcion-create.interface';
  
@Injectable()
export class InscripcionCreateUseCase {
  constructor(private readonly service: InscripcionCreateService) {}

  async execute(data: IInscripcionCreate): Promise<InscripcionCreateResponseDto> {
    const entity = await this.service.execute(data);
    return InscripcionCreateResponseDto.fromEntity(entity);
  }
}