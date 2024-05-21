import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CostosYGanancia } from './costosYGanancia.entity';
import { TipoCosto } from './tipoCosto.entity';

@Entity()
export class Costo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('numeric')
  valor: number;

  @OneToOne(() => TipoCosto)
  @JoinColumn()
  tipoCosto: TipoCosto;

  @ManyToOne(() => CostosYGanancia, (costosYGanancia) => costosYGanancia.costo)
  costosYGanancia: CostosYGanancia;
}
