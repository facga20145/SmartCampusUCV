import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { InscripcionRepositoryPort } from '../../../infrastructure/adapters/ports/inscripcion-repository.port';
import { IInscripcionCreate } from '../../interfaces/inscripcion-create.interface';
import { InscripcionEntity } from '../../entities/inscripcion.entity';
import { PrismaClient } from '@prisma/client';
  
@Injectable()
export class InscripcionCreateService {
  constructor(
    @Inject(InscripcionRepositoryPort)
    private readonly repo: InscripcionRepositoryPort,
    @Inject(PrismaClient)
    private readonly prisma: PrismaClient,
  ) {}

  async execute(data: IInscripcionCreate): Promise<InscripcionEntity> {
    const existente = await this.prisma.inscripcion.findUnique({
      where: { usuarioId_actividadId: { usuarioId: data.usuarioId, actividadId: data.actividadId } },
    });
    if (existente) {
      throw new BadRequestException('El usuario ya está inscrito en la actividad');
    }

    const actividad = await this.prisma.actividad.findUnique({
      where: { id: data.actividadId },
      select: { maxParticipantes: true, id: true },
    });
    if (!actividad) {
      throw new BadRequestException('Actividad no encontrada');
    }
    if (actividad.maxParticipantes != null) {
      const inscritos = await this.prisma.inscripcion.count({ where: { actividadId: data.actividadId, estado: { in: ['pendiente', 'confirmada'] } } });
      if (inscritos >= actividad.maxParticipantes) {
        throw new BadRequestException('No hay cupos disponibles para esta actividad');
      }
    }

    return this.repo.create(data);
  }
}