import { Injectable } from '@nestjs/common';
import { UsuarioRepositoryPort } from '../ports/usuario-repository.port';
import { IUsuarioCreate } from '../../../domain/interfaces/usuario-create.interface';
import { IUsuarioUpdate } from '../../../domain/interfaces/usuario-update.interface';
import { UsuarioEntity } from '../../../domain/entities/usuario.entity';

@Injectable()
export class UsuarioRepositoryImpl implements UsuarioRepositoryPort {
  async create(data: IUsuarioCreate): Promise<UsuarioEntity> {
    // Implementación pendiente
    throw new Error('Not implemented');
  }

  async findAll(): Promise<UsuarioEntity[]> {
    // Implementación pendiente
    throw new Error('Not implemented');
  }

  async findById(id: number): Promise<UsuarioEntity | null> {
    // Implementación pendiente
    throw new Error('Not implemented');
  }

  async findByEmail(email: string): Promise<UsuarioEntity | null> {
    // Implementación pendiente
    throw new Error('Not implemented');
  }

  async update(data: IUsuarioUpdate): Promise<UsuarioEntity> {
    // Implementación pendiente
    throw new Error('Not implemented');
  }

  async delete(id: number): Promise<void> {
    // Implementación pendiente
    throw new Error('Not implemented');
  }
}