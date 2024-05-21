import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EstadoPedido {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  nombre: string;

  @Column('text')
  color: string;
}
