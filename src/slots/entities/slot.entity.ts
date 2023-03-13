import { BasicData } from '../../shared/entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('slots', { schema: 'parking' })
export class Slot extends BasicData {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'int' })
    floorId: number;

    @Column({ type: 'int' })
    slotNumber: number;

    @Column({ type: 'boolean', default: false })
    isAvailable: boolean;
}
