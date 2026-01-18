// Path: src/modules/ratings/entities/rating.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Store } from '../../stores/entities/store.entity';

@Entity('ratings')
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' }) 
  // Requirement: The ratings should range from 1 to 5.
  rating: number;

  @Column({ type: 'text', nullable: true })
  // Optional feedback field for text reviews.
  feedback: string;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  // Link to the user who submitted the rating.
  user: User;

  @ManyToOne(() => Store, (store) => store.id, { onDelete: 'CASCADE' })
  // Link to the specific store being rated.
  store: Store;

  @CreateDateColumn()
  // Useful for displaying recent feedback on the Store Owner dashboard.
  createdAt: Date;
}