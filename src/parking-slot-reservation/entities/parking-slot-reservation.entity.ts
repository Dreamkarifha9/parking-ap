import { BasicData } from '../../shared/entities';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('parking_slot_reservations', { schema: 'parking' })
export class ParkingSlotReservation extends BasicData {
    @PrimaryColumn({ type: 'uuid' })
    id: string;

    @Column({ nullable: false })
    slotId: number;

    @Column({ type: 'timestamptz' })
    startTimestamp: Date;

    @Column({ type: 'timestamptz', nullable: true })
    exitTimestamp?: Date;

    @Column({ nullable: false })
    durationInMinutes: number;

    @Column({ type: 'timestamptz' })
    bookingDate: Date;

    @Column({ type: 'varchar' })
    numberPlate: string;

    @Column({ type: 'varchar' })
    carSize: string;
}
