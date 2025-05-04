import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cotacao } from './cotacao.entity';

@Entity()
export class Empresa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  cnpj: string;

  @Column()
  tipo: string; // Pode ser um enum (ex: 'COMPRADORA' | 'FORNECEDORA' | 'AMBAS')

  // Relação com cotações onde a empresa é a compradora
  @OneToMany(() => Cotacao, (cotacao) => cotacao.empresaCompradora)
  cotacoesCompradora: Cotacao[];

  // Relação com cotações onde a empresa é a fornecedora
  @OneToMany(() => Cotacao, (cotacao) => cotacao.empresaFornecedora)
  cotacoesFornecedora: Cotacao[];
}
