import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Producto } from './producto.entity';

@Entity()
export class ImagenProducto {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('text')
  url: string;

  @ManyToOne(() => Producto, (producto) => producto.imagenesProducto, {
    onDelete: 'CASCADE',
  })
  producto: Producto;
}
