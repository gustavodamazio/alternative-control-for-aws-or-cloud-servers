import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { addHours } from 'date-fns';
import { Request, Response } from 'express';
import { OptionsExpressHandlebars } from 'src/@types/nodemailer';
import { JwtHelper } from '../../utils/gen-jwt';

import mailer from '../../modules/mailer';
import { User } from '../models/User';
import HttpsResponse from '../models/HttpsResponse';
import { HttpStatusCode } from '../models/HttpStatusCodes';
import UserView from '../views/UserView';
import { AuthRequestValidationService } from '../services/AuthRequestValidationService';
import { v4 as uuidv4 } from 'uuid';

export default class AuthController {
    // -----------------------------------------------------------------------------------------------------
    // @ Login
    // -----------------------------------------------------------------------------------------------------
    async show(request: Request, response: Response) {
        await AuthRequestValidationService.show(request.body);
        const { email, password } = request.body;
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return response.status(HttpStatusCode.NotFound).send(
                new HttpsResponse({
                    details: {},
                    message: 'User not found',
                    status_code: HttpStatusCode.NotFound,
                    status_message: 'Not Found',
                    type: 'error'
                }).fromJson()
            );
        }
        if (!(await bcrypt.compare(password, user.password))) {
            return response.status(HttpStatusCode.Unauthorized).send(
                new HttpsResponse({
                    details: {},
                    message: 'Email or Password is invalid.',
                    status_code: HttpStatusCode.Unauthorized,
                    status_message: 'Unauthorized',
                    type: 'error'
                }).fromJson()
            );
        }

        user.password = undefined; // Remove password this response.
        const uuid: string = uuidv4();
        await User.findOneAndUpdate(
            { _id: user.id },
            {
                $set: {
                    lastJwtGenRef: uuid
                }
            }
        );
        return response.status(HttpStatusCode.Ok).json(
            new HttpsResponse({
                details: { user: UserView.render(user), token: JwtHelper.gen(user.id, uuid) },
                message: 'Logged.',
                status_code: HttpStatusCode.Ok,
                status_message: 'OK',
                type: 'success'
            }).fromJson()
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Register
    // -----------------------------------------------------------------------------------------------------
    async create(request: Request, response: Response) {
        await AuthRequestValidationService.create(request.body);
        if (await User.findOne({ email: request.body.email })) {
            return response.status(HttpStatusCode.Conflict).send(
                new HttpsResponse({
                    details: {},
                    message: 'User already exists.',
                    status_code: HttpStatusCode.Conflict,
                    status_message: 'Conflict',
                    type: 'error'
                }).fromJson()
            );
        }
        const uuid: string = uuidv4();
        const user = await User.create({ ...request.body, lastJwtGenRef: uuid });
        return response.status(HttpStatusCode.Created).json(
            new HttpsResponse({
                details: { user: UserView.render(user), token: JwtHelper.gen(user.id, uuid) },
                message: 'User created.',
                status_code: HttpStatusCode.Created,
                status_message: 'Created',
                type: 'success'
            }).fromJson()
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Forgot pass
    // -----------------------------------------------------------------------------------------------------
    async forgotPass(request: Request, response: Response) {
        await AuthRequestValidationService.forgotPass(request.body);
        const { email } = request.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return response.status(HttpStatusCode.NotFound).send(
                    new HttpsResponse({
                        details: {},
                        message: 'User not found.',
                        status_code: HttpStatusCode.NotFound,
                        status_message: 'Not Found',
                        type: 'error'
                    }).fromJson()
                );
            }
            const token = crypto.randomBytes(20).toString('hex');
            const nowMoreOne = addHours(new Date(), 1);
            await User.findOneAndUpdate(
                { _id: user.id },
                {
                    $set: {
                        passwordResetExpires: nowMoreOne,
                        passwordResetToken: token
                    }
                }
            );

            mailer.sendMail(
                {
                    to: email,
                    subject: 'CLOUD PROJECT - REDEFINIÇÃO DE SENHA',
                    from: 'gustavo@gdpro.com.br',
                    template: 'forgot-pass',
                    context: { token }
                } as OptionsExpressHandlebars,
                (err) => {
                    if (err) {
                        console.error(err);
                        return response.status(HttpStatusCode.BadRequest).send(
                            new HttpsResponse({
                                details: {},
                                message: 'Cannot send forgot password email.',
                                status_code: HttpStatusCode.BadRequest,
                                status_message: 'Bad Request',
                                type: 'error'
                            }).fromJson()
                        );
                    }
                    return response.status(HttpStatusCode.Ok).json(
                        new HttpsResponse({
                            details: {},
                            message: 'Email sent check your inbox.',
                            status_code: HttpStatusCode.Ok,
                            status_message: 'OK',
                            type: 'success'
                        }).fromJson()
                    );
                }
            );
        } catch (error) {
            console.error(error);
            return response.status(HttpStatusCode.BadRequest).send(
                new HttpsResponse({
                    details: {},
                    message: 'Erro on forgot password, try again.',
                    status_code: HttpStatusCode.BadRequest,
                    status_message: 'Bad Request',
                    type: 'error'
                }).fromJson()
            );
        }
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Reset pass
    // -----------------------------------------------------------------------------------------------------
    async resetPass(request: Request, response: Response) {
        await AuthRequestValidationService.resetPass(request.body);
        const { email, passwordResetToken, password } = request.body;
        try {
            const user = await User.findOne({ email }).select('+passwordResetToken passwordResetExpires');
            if (!user) {
                return response.status(HttpStatusCode.NotFound).send(
                    new HttpsResponse({
                        details: {},
                        message: 'User not found.',
                        status_code: HttpStatusCode.NotFound,
                        status_message: 'Not Found',
                        type: 'error'
                    }).fromJson()
                );
            }
            if (passwordResetToken !== user.passwordResetToken) {
                return response.status(HttpStatusCode.Unauthorized).send(
                    new HttpsResponse({
                        details: {},
                        message: 'Token invalid.',
                        status_code: HttpStatusCode.Unauthorized,
                        status_message: 'Unauthorized',
                        type: 'error'
                    }).fromJson()
                );
            }

            const now = new Date();
            if (now > user.passwordResetExpires) {
                return response.status(HttpStatusCode.BadRequest).send(
                    new HttpsResponse({
                        details: {},
                        message: 'Token expired, generate a new one.',
                        status_code: HttpStatusCode.BadRequest,
                        status_message: 'Bad Request',
                        type: 'error'
                    }).fromJson()
                );
            }

            user.password = password;
            user.passwordResetExpires = new Date();
            await user.save();

            return response.status(HttpStatusCode.Ok).json(
                new HttpsResponse({
                    details: {},
                    message: 'Password changed.',
                    status_code: HttpStatusCode.Ok,
                    status_message: 'OK',
                    type: 'success'
                }).fromJson()
            );
        } catch (error) {
            console.error(error);
            return response.status(HttpStatusCode.BadRequest).send(
                new HttpsResponse({
                    details: {},
                    message: 'Cannot reset password, try again.',
                    status_code: HttpStatusCode.BadRequest,
                    status_message: 'Bad Request',
                    type: 'error'
                }).fromJson()
            );
        }
    }
}
