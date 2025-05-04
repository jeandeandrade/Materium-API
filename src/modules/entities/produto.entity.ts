import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Empresa } from './empresa.entity';

@Entity()
@Unique(['nome', 'fornecedor']) // Evita produtos duplicados para o mesmo fornecedor
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ nullable: true })
  descricao: string;

  @ManyToOne(() => Empresa)
  fornecedor: Empresa;
}
