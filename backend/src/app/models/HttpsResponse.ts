import { HttpStatusCode } from './HttpStatusCodes';

export default class HttpsResponse<T = { [key: string]: any }> {
    public details: T;
    public message: string;
    public status_code: HttpStatusCode;
    public status_message: string;
    public type: 'success' | 'error';

    constructor({ details, message, status_code, status_message, type }: Omit<HttpsResponse<T>, 'fromJson'>) {
        this.details = details;
        this.message = message;
        this.status_code = status_code;
        this.status_message = status_message;
        this.type = type;
    }

    public fromJson(): {} & this {
        const data = Object.assign({}, { ...this });
        delete data.fromJson;
        return data;
    }
}
