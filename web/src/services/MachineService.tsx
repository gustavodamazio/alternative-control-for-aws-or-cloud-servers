import { AxiosResponse } from 'axios'
import Machine from '../models/Machine'
import api from './Api'

abstract class MachineService {
  static list(): Promise<AxiosResponse<Machine[]>> {
    return api.get<Machine[]>('/machines/list')
  }
}

export default MachineService
