import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { UsuarioRepositoryPort } from '../ports/usuario-repository.port';
import { IUsuarioCreate } from '../../../domain/interfaces/usuario-create.interface';
import { IUsuarioUpdate } from '../../../domain/interfaces/usuario-update.interface';
import { UsuarioEntity } from '../../../domain/entities/usuario.entity';
import { PrismaClient } from '@prisma/client';
import { HashUtil } from '../../../../../utils/hash.util';

@Injectable()
export class UsuarioRepositoryImpl implements UsuarioRepositoryPort {
  constructor(
    @Inject(PrismaClient) private readonly prisma: PrismaClient,
  ) {}

  private toEntity(usuario: any): UsuarioEntity {
    return new UsuarioEntity(
      usuario.id,
      usuario.nombre,
      usuario.apellido,
      usuario.correoInstitucional,
      usuario.contrasena,
      usuario.rol,
      usuario.intereses,
      usuario.hobbies,
      usuario.foto,
    );
  }

  async create(data: IUsuarioCreate): Promise<UsuarioEntity> {
    try {
      const hashedPassword = await HashUtil.hashPassword(data.contrasena);
      const userData = { ...data, contrasena: hashedPassword };
      const usuario = await this.prisma.usuario.create({ data: userData });
      return this.toEntity(usuario);
    } catch (err: any) {
      if (err?.code === 'P2002') {
        throw new ConflictException('El correo institucional ya está registrado');
      }
      throw err;
    }
  }

  async findAll(): Promise<UsuarioEntity[]> {
    const usuarios = await this.prisma.usuario.findMany();
    return usuarios.map((u) => this.toEntity(u));
  }

  async findById(id: number): Promise<UsuarioEntity | null> {
    const usuario = await this.prisma.usuario.findUnique({ where: { id } });
    if (!usuario) return null;
    return this.toEntity(usuario);
  }

  async findByEmail(email: string): Promise<UsuarioEntity | null> {
    const usuario = await this.prisma.usuario.findUnique({ where: { correoInstitucional: email } });
    if (!usuario) return null;
    return this.toEntity(usuario);
  }

  async update(data: IUsuarioUpdate): Promise<UsuarioEntity> {
    const updateData: any = {
      nombre: data.nombre,
      apellido: data.apellido,
      intereses: data.intereses,
      hobbies: data.hobbies,
      foto: data.foto,
    };
    
    // Solo hashear la contraseña si se proporciona
    if (data.contrasena) {
      updateData.contrasena = await HashUtil.hashPassword(data.contrasena);
    }
    
    const usuario = await this.prisma.usuario.update({
      where: { id: data.id },
      data: updateData,
    });
    return this.toEntity(usuario);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.usuario.delete({ where: { id } });
  }
}