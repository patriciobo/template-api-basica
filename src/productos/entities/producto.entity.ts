import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  modelo: string;

  @Column('text', {
    unique: true,
  })
  slug: string;

  @BeforeInsert()
  crearSlug() {
    this.slug = this.modelo.toLowerCase().replaceAll(' ', '_');
  }

  @BeforeUpdate()
  actualizarSlug() {
    this.slug = this.modelo.toLowerCase().replaceAll(' ', '_');
  }
}
