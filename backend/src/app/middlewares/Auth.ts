import { ENV } from '@env/config-env';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import HttpsResponse from '../models/HttpsResponse';
import { HttpStatusCode } from '../models/HttpStatusCodes';

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

export default function authMiddleware(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers; // Get token

    if (!authorization) {
        return response.status(HttpStatusCode.Unauthorized).send(
            new HttpsResponse({
                details: {},
                message: 'No token provided.',
                status_code: HttpStatusCode.Unauthorized,
                status_message: 'Unauthorized',
                type: 'error'
            }).fromJson()
        );
    }

    const parts = authorization.split(' ');
    if (!(parts.length === 2)) {
        return response.status(HttpStatusCode.Unauthorized).send(
            new HttpsResponse({
                details: {},
                message: 'Token error.',
                status_code: HttpStatusCode.Unauthorized,
                status_message: 'Unauthorized',
                type: 'error'
            }).fromJson()
        );
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return response.status(HttpStatusCode.Unauthorized).send(
            new HttpsResponse({
                details: {},
                message: 'Token bad formatted.',
                status_code: HttpStatusCode.Unauthorized,
                status_message: 'Unauthorized',
                type: 'error'
            }).fromJson()
        );
    }

    jwt.verify(token, ENV.JWT_SECRET, (err, decoded: TokenPayload) => {
        if (err) {
            return response.status(HttpStatusCode.Unauthorized).send(
                new HttpsResponse({
                    details: {},
                    message: 'Token invalid.',
                    status_code: HttpStatusCode.Unauthorized,
                    status_message: 'Unauthorized',
                    type: 'error'
                }).fromJson()
            );
        } else {
            request.userId = decoded.id;
            return next();
        }
    });
}
