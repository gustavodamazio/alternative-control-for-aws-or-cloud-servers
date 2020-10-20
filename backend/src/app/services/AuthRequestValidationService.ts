import * as Yup from 'yup';

export abstract class AuthRequestValidationService {
    static async show<T = { email: string; password: string }>(body: T): Promise<void> {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().min(8).required()
        });
        await schema.validate(body, { abortEarly: false });
    }
    static async create<T = { email: string; password: string; name: string }>(body: T): Promise<void> {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().min(8).required(),
            name: Yup.string().min(2).required()
        });
        await schema.validate(body, { abortEarly: false });
    }
    static async forgotPass<T = { email: string }>(body: T): Promise<void> {
        const schema = Yup.object().shape({
            email: Yup.string().email().required()
        });
        await schema.validate(body, { abortEarly: false });
    }

    static async resetPass<T = { email: string; password: string; passwordResetToken: string }>(body: T): Promise<void> {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().min(8).required(),
            passwordResetToken: Yup.string().required()
        });
        await schema.validate(body, { abortEarly: false });
    }
}
