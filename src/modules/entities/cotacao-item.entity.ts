import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Cotacao } from './cotacao.entity';
import { Produto } from './produto.entity';

@Entity()
export class CotacaoItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cotacao, (cotacao) => cotacao.itens)
  cotacao: Cotacao;

  @ManyToOne(() => Produto)
  produto: Produto;

  @Column()
  quantidade: number;

  @Column('decimal')
  precoUnitario: number;
}
