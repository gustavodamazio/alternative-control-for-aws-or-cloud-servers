"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = require("date-fns");

var _awsInstanceTypes = require("../../utils/aws-instance-types");

var _typeorm = require("typeorm");

var _Machine = _interopRequireDefault(require("../models/entities/Machine"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MachineController {
  async index(request, response) {
    const machineRepository = (0, _typeorm.getRepository)(_Machine.default);
    const list = await machineRepository.find({
      order: {
        instance_active: 'DESC',
        instance_name: 'ASC'
      }
    });
    return response.status(200).json(list);
  }

  async createOrUpdateBatch(request, response) {
    const machinesList = request.body;
    const machineRepository = (0, _typeorm.getRepository)(_Machine.default);
    const where = await machineRepository.find({
      where: {
        instance_id: (0, _typeorm.In)(machinesList.map(m => m.InstanceId))
      }
    });
    const createdMachines = new Array();
    const updatedMachines = new Array();

    for (const {
      Instance,
      InstanceId,
      InstanceType,
      LaunchTime,
      PrivateIpAddress,
      InstanceState
    } of machinesList) {
      const db_index = where.findIndex(m => m.instance_id === InstanceId);
      const instanceType = _awsInstanceTypes.InstanceTypes[InstanceType];
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
          launch_time: (0, _dateFns.parse)(LaunchTime, 'dd/MM/yyyy HH:mm:ss', dateRef),
          private_ip_address: PrivateIpAddress,
          memory_mb: instanceType.MemoryMb,
          sync_first: dateRef,
          sync_last: dateRef,
          v_cpu: instanceType.VCPU
        });
        const saveRes = await machineRepository.save(machine);
        createdMachines.push(saveRes); //#endregion
      } else {
        //#region Update region
        await machineRepository.update({
          instance_id: InstanceId
        }, {
          gpu: instanceType.GPU,
          instance_active: InstanceState === 'On' ? true : false,
          instance_name: Instance,
          instance_state: InstanceState,
          instance_type: InstanceType,
          launch_time: (0, _dateFns.parse)(LaunchTime, 'dd/MM/yyyy HH:mm:ss', dateRef),
          private_ip_address: PrivateIpAddress,
          memory_mb: instanceType.MemoryMb,
          sync_last: dateRef,
          v_cpu: instanceType.VCPU
        });
        updatedMachines.push(InstanceId); //#endregion
      }
    }

    return response.status(200).json({
      createdMachines: {
        length: createdMachines.length,
        rows_data: createdMachines
      },
      updatedMachines: {
        length: updatedMachines.length,
        instances_ids: updatedMachines
      }
    });
  }

}

exports.default = MachineController;