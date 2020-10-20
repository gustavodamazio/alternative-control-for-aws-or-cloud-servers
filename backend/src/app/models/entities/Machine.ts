import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('machines')
export default class Machine {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    gpu: number;

    @Column()
    instance_active: boolean;

    @Column()
    instance_id: string;

    @Column()
    instance_name: string;

    @Column()
    instance_state: string;

    @Column()
    instance_type: string;

    @Column()
    launch_time: Date;

    @Column()
    memory_mb: number;

    @Column()
    private_ip_address: string;

    @Column()
    sync_first: Date;

    @Column()
    sync_last: Date;

    @Column()
    v_cpu: number;
}
