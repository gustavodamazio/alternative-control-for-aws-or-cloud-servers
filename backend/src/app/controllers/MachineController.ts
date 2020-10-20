import { parse } from 'date-fns';
import { Request, Response } from 'express';
import { InstanceTypes } from '../../utils/aws-instance-types';
import { getRepository, In } from 'typeorm';

import Machine from '../models/entities/Machine';
import ExternalApiMachine from '../services/ExternalApiMachine';
import { HttpStatusCode } from '../models/HttpStatusCodes';

export class MachineController {
    async index(request: Request, response: Response) {
        const machineRepository = getRepository(Machine);
        const list = await machineRepository.find({ order: { instance_active: 'DESC', instance_name: 'ASC' } });
        return response.status(HttpStatusCode.Ok).json(list);
    }

    async createOrUpdateBatch() {
        const machinesList = await ExternalApiMachine.list();

        const machineRepository = getRepository(Machine);
        const where = await machineRepository.find({ where: { instance_id: In(machinesList.map((m) => m.InstanceId)) } });
        const createdMachines: Machine[] = new Array();
        const updatedMachines: string[] = new Array();

        for (const { Instance, InstanceId, InstanceType, LaunchTime, PrivateIpAddress, InstanceState } of machinesList) {
            const db_index = where.findIndex((m) => m.instance_id === InstanceId);
            const instanceType = InstanceTypes[InstanceType];
            const dateRef = new Date();
            if (db_index === -1) {
                //#region Save
                const machine = machineRepository.create({
                    gpu: instanceType.GPU,
                    instance_active: InstanceState === 'On' ? true : false,
                    instance_id: InstanceId,
                    instance_name: Instance,
                    instance_state: InstanceState,
                    instance_type: InstanceType,
                    launch_time: parse(LaunchTime, 'dd/MM/yyyy HH:mm:ss', dateRef),
                    private_ip_address: PrivateIpAddress,
                    memory_mb: instanceType.MemoryMb,
                    sync_first: dateRef,
                    sync_last: dateRef,
                    v_cpu: instanceType.VCPU
                });
                const saveRes = await machineRepository.save(machine);
                createdMachines.push(saveRes);
                //#endregion
            } else {
                //#region Update region
                await machineRepository.update(
                    { instance_id: InstanceId },
                    {
                        gpu: instanceType.GPU,
                        instance_active: InstanceState === 'On' ? true : false,
                        instance_name: Instance,
                        instance_state: InstanceState,
                        instance_type: InstanceType,
                        launch_time: parse(LaunchTime, 'dd/MM/yyyy HH:mm:ss', dateRef),
                        private_ip_address: PrivateIpAddress,
                        memory_mb: instanceType.MemoryMb,
                        sync_last: dateRef,
                        v_cpu: instanceType.VCPU
                    }
                );
                updatedMachines.push(InstanceId);
                //#endregion
            }
        }
        console.log({
            info: `MachineController.createOrUpdateBatch detail execution log.`,
            createdMachines: { length: createdMachines.length, rows_data: createdMachines },
            updatedMachines: { length: updatedMachines.length, instances_ids: updatedMachines }
        });
    }
}

export default new MachineController();
