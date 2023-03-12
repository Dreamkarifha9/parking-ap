import { BasicData } from 'src/shared/entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('blocks', { schema: 'parking' })
export class Blocks extends BasicData {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'int' })
    parkingLotId: number;

    @Column({ type: 'varchar' })
    blockCode: string;

    @Column({ type: 'varchar' })
    blockSize: string;

    @Column({ type: 'boolean', default: false })
    isBlockFull: boolean;
}
