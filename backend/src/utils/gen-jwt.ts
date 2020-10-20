import { ENV } from '@env/config-env';
import * as jwt from 'jsonwebtoken';

export abstract class JwtHelper {
    static gen(id: string, gen_ref: string) {
        const token = jwt.sign({ id, gen_ref }, ENV.JWT_SECRET, { expiresIn: '60m' });
        return token;
    }
}
