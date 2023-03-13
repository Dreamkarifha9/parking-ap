import { BasicData } from 'src/shared/entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('floors', { schema: 'parking' })
export class Floor extends BasicData {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'int' })
    blockId: number;

    @Column({ type: 'int' })
    floorNumber: number;

    @Column({ type: 'int' })
    numberOfSlot: number;
}
