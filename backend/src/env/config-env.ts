import * as dotenv from 'dotenv';

interface EnvironmentModel {
    EXT_API_LOGIN: string;
    EXT_API_PASS: string;
    EXT_API_URL_BASE: string;
    JWT_SECRET: string;
    MAIL_HOST: string;
    MAIL_PASS: string;
    MAIL_PORT: number;
    MAIL_USER: string;
    MONGO_DB: string;
    PORT: number;
}
const _env = dotenv.config({ path: `${__dirname}/.env` });
const ENV = (_env.parsed as any) as EnvironmentModel;
export { _env, ENV };
