import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('todo')
export class TodoItemEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'timestamp', nullable: true })
  deadline: string | null;

  @Column({ type: 'boolean', default: false })
  isDone: boolean;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  modified: string;
}
