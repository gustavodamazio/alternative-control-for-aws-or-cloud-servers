import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createMachines1602605224721 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'machines',
                columns: [
                    { name: 'id', type: 'integer', unsigned: true, isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'gpu', type: 'integer' },
                    { name: 'instance_active', type: 'boolean' },
                    { name: 'instance_id', type: 'varchar', isUnique: true },
                    { name: 'instance_name', type: 'varchar' },
                    { name: 'instance_state', type: 'char' },
                    { name: 'instance_type', type: 'char' },
                    { name: 'launch_time', type: 'date' },
                    { name: 'memory_mb', type: 'integer' },
                    { name: 'private_ip_address', type: 'varchar' },
                    { name: 'sync_first', type: 'date' },
                    { name: 'sync_last', type: 'date' },
                    { name: 'v_cpu', type: 'integer' }
                ]
            })
        );
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('machines');
    }
}

// Machine api return
// "Instance": "CLI-350682-DB01",
// "InstanceId": "i-04da3073d034c99a7",
// "InstanceType": "t3.medium",
// "LaunchTime": "09/10/2020 09:14:13",
// "PrivateIpAddress": "172.30.1.252",
// "InstanceState": "Off"
