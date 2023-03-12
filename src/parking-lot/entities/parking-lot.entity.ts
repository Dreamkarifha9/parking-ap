import { BasicData } from 'src/shared/entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('parking_lot', { schema: 'parking' })
export class ParkingLot extends BasicData {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ type: 'int' })
    numberOfBlocks: number;
}
