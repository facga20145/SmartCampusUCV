import { Injectable, Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { InscripcionRepositoryPort } from '../ports/inscripcion-repository.port';
import { IInscripcionCreate } from '../../../domain/interfaces/inscripcion-create.interface';
import { IInscripcionUpdate } from '../../../domain/interfaces/inscripcion-update.interface';
import { InscripcionEntity } from '../../../domain/entities/inscripcion.entity';
  
@Injectable()
export class InscripcionRepositoryImpl implements InscripcionRepositoryPort {
  constructor(
    @Inject(PrismaClient) private readonly prisma: PrismaClient,
  ) {}

  private toEntity(i: any): InscripcionEntity {
    return new InscripcionEntity(
      i.id,
      i.usuarioId,
      i.actividadId,
      new Date(i.fechaInscripcion),
      i.estado,
    );
  }

  async create(data: IInscripcionCreate): Promise<InscripcionEntity> {
    const created = await this.prisma.inscripcion.create({
      data: {
        usuarioId: data.usuarioId,
        actividadId: data.actividadId,
      },
    });
    return this.toEntity(created);
  }

  async update(data: IInscripcionUpdate): Promise<InscripcionEntity> {
    const updated = await this.prisma.inscripcion.update({
      where: { id: data.id },
      data: { estado: data.estado },
    });
    return this.toEntity(updated);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.inscripcion.delete({ where: { id } });
  }

  async findById(id: number): Promise<InscripcionEntity | null> {
    const i = await this.prisma.inscripcion.findUnique({ where: { id } });
    return i ? this.toEntity(i) : null;
  }

  async findByActividad(actividadId: number): Promise<InscripcionEntity[]> {
    const items = await this.prisma.inscripcion.findMany({ where: { actividadId } });
    return items.map((i) => this.toEntity(i));
  }

  async findByUsuario(usuarioId: number): Promise<any[]> {
    const items = await this.prisma.inscripcion.findMany({
      where: { usuarioId },
      include: {
        actividad: {
          include: {
            organizador: {
              select: {
                nombre: true,
                apellido: true,
              },
            },
          },
        },
      },
    });
    return items;
  }
}