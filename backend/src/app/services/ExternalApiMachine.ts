import { ENV } from '@env/config-env';
import Axios from 'axios';
import Machine from '../models/entities/Machine';
import * as jwt from 'jsonwebtoken';

interface ExtApiLoginResponse {
    user: {
        id: number;
        login: string;
        email: string;
        name: string;
        permission: string;
        avatar: any;
    };
    token: string;
    expiresIn: number;
}

export interface ExtApiMachine {
    Instance: string;
    InstanceId: string;
    InstanceType: string;
    LaunchTime: string;
    PrivateIpAddress: string;
    InstanceState: 'On' | 'Off';
}

class ExternalApiMachine {
    private api = Axios.create({ baseURL: ENV.EXT_API_URL_BASE });
    private loginResponseCache?: { decode?: { id?: number; iat?: number; exp?: number }; lastExtApiLoginResponse?: ExtApiLoginResponse; exp_date?: Date };
    public async login(): Promise<void> {
        const now = new Date();
        if ((this.loginResponseCache?.exp_date?.getTime() ?? 0) < now.getTime()) {
            console.info({ info: `ExternalApiMachine.login => Logging in, to request the external api. => ${ENV.EXT_API_URL_BASE}login` });
            const response = await this.api.post<ExtApiLoginResponse>('login', { login: ENV.EXT_API_LOGIN, password: ENV.EXT_API_PASS });
            const decode = jwt.decode(response.data.token) as { id: number; iat: number; exp: number };
            this.loginResponseCache = { decode, lastExtApiLoginResponse: response.data, exp_date: new Date(decode.exp * 1000) };
            this.api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
        }
    }
    public async list(): Promise<ExtApiMachine[]> {
        await this.login();
        console.info({ info: `ExternalApiMachine.list => Listing external api servers, authenticated. => ${ENV.EXT_API_URL_BASE}listaServidor` });
        const machineList = await this.api.get<ExtApiMachine[]>('listaServidor');
        return machineList.data;
    }
}

export default new ExternalApiMachine();
