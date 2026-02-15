import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum VisitorType {
  GUEST = 'GUEST',
  DELIVERY = 'DELIVERY',
  CONTRACTOR = 'CONTRACTOR',
}

@Entity('visitors')
export class Visitor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  company?: string;

  @Column({
    type: 'enum',
    enum: VisitorType,
    default: VisitorType.GUEST,
  })
  type: VisitorType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
