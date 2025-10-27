import { Injectable, Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ActividadRepositoryPort } from '../ports/actividad-repository.port';
import { IActividadCreate } from '../../../domain/interfaces/actividad-create.interface';
import { IActividadUpdate } from '../../../domain/interfaces/actividad-update.interface';
import { IActividadFilters } from '../../../domain/interfaces/actividad-filters.interface';
import { ActividadEntity } from '../../../domain/entities/actividad.entity';

@Injectable()
export class ActividadRepositoryImpl implements ActividadRepositoryPort {
  constructor(
    @Inject(PrismaClient) private readonly prisma: PrismaClient,
  ) {}

  private toEntity(a: any): ActividadEntity {
    return new ActividadEntity(
      a.id,
      a.titulo,
      a.descripcion,
      a.categoria,
      new Date(a.fecha),
      new Date(a.hora),
      a.lugar,
      a.maxParticipantes,
      a.nivelSostenibilidad,
      a.organizadorId,
    );
  }

  async create(data: IActividadCreate): Promise<ActividadEntity> {
    // Mapear categoría personalizada al enum o usar un valor por defecto
    const categoriaEnum = ['deportiva', 'artistica', 'voluntariado', 'canto', 'ambiental', 'tecnologica', 'cultural', 'academica', 'social'].includes(data.categoria)
      ? data.categoria
      : 'voluntariado'; // fallback

    const creada = await this.prisma.actividad.create({
      data: {
        titulo: data.titulo,
        descripcion: data.descripcion ?? null,
        categoria: categoriaEnum as any,
        fecha: data.fecha,
        hora: data.hora,
        lugar: data.lugar,
        maxParticipantes: data.maxParticipantes ?? null,
        nivelSostenibilidad: data.nivelSostenibilidad ?? null,
        organizadorId: data.organizadorId,
      },
    });
    return this.toEntity(creada);
  }

  async findAll(filters?: IActividadFilters): Promise<ActividadEntity[]> {
    const where: any = {};
    if (filters?.categoria) where.categoria = filters.categoria;
    if (filters?.lugar) where.lugar = { contains: filters.lugar, mode: 'insensitive' };
    if (filters?.fechaDesde || filters?.fechaHasta) {
      where.fecha = {};
      if (filters.fechaDesde) where.fecha.gte = filters.fechaDesde;
      if (filters.fechaHasta) where.fecha.lte = filters.fechaHasta;
    }
    if (typeof filters?.nivelSostenibilidadMin === 'number') {
      where.nivelSostenibilidad = { gte: filters.nivelSostenibilidadMin };
    }

    const items = await this.prisma.actividad.findMany({ where });
    return items.map((a) => this.toEntity(a));
  }

  async findById(id: number): Promise<ActividadEntity | null> {
    const a = await this.prisma.actividad.findUnique({ where: { id } });
    return a ? this.toEntity(a) : null;
  }

  async update(data: IActividadUpdate): Promise<ActividadEntity> {
    const actualizada = await this.prisma.actividad.update({
      where: { id: data.id },
      data: {
        titulo: data.titulo,
        descripcion: data.descripcion,
        categoria: data.categoria,
        fecha: data.fecha,
        hora: data.hora,
        lugar: data.lugar,
        maxParticipantes: data.maxParticipantes,
        nivelSostenibilidad: data.nivelSostenibilidad,
      },
    });
    return this.toEntity(actualizada);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.actividad.delete({ where: { id } });
  }
}