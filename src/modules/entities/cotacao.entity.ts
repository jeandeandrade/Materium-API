import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Column,
} from 'typeorm';
import { Empresa } from './empresa.entity';
import { CotacaoItem } from './cotacao-item.entity';

@Entity()
export class Cotacao {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Empresa, (empresa) => empresa.cotacoesCompradora)
  empresaCompradora: Empresa;

  @ManyToOne(() => Empresa, (empresa) => empresa.cotacoesFornecedora)
  empresaFornecedora: Empresa;

  @Column()
  dataSolicitacao: Date;

  @Column()
  status: string;

  @OneToMany(() => CotacaoItem, (cotacaoItem) => cotacaoItem.cotacao)
  itens: CotacaoItem[];
}
