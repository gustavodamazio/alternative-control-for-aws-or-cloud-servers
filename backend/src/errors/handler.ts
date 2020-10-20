import { ErrorRequestHandler } from 'express';
import HttpsResponse from '../app/models/HttpsResponse';
import { HttpStatusCode } from '../app/models/HttpStatusCodes';
import { ValidationError } from 'yup';

interface ValidationErrors {
    [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
    console.error(error);

    if (error instanceof ValidationError) {
        const validationErrors: ValidationErrors = {};
        error.inner.forEach((err) => {
            validationErrors[err.path] = err.errors;
        });
        return response.status(HttpStatusCode.BadRequest).json(
            new HttpsResponse({
                status_code: HttpStatusCode.BadRequest,
                status_message: 'Bad Request',
                details: { validationErrors },
                message: 'Validation request fails.',
                type: 'error'
            }).fromJson()
        );
    }

    return response.status(HttpStatusCode.InternalServerError).json(
        new HttpsResponse({
            status_code: HttpStatusCode.InternalServerError,
            status_message: 'Internal Server Error',
            details: {},
            message: 'Aborted',
            type: 'error'
        }).fromJson()
    );
};

export default errorHandler;
