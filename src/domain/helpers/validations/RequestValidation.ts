import * as Joi from "joi";
import {PersonRequest} from "../../usecases";

export class RequestValidation {

    public static validate(request: PersonRequest): void {
        const {error} = Joi.valid(RequestValidation.getValidationRequestSchema(), request);
        console.log('El error: ', error);
    }

    private static getValidationRequestSchema(): Joi.Schema {
        return Joi.object().keys({
            name: Joi.string().alphanum().min(3).max(50).required(),
            documentType: Joi.string().valid('CC', 'TI', 'RC', 'CE').required(),
            document: Joi.string().alphanum().min(4).max(13).required(),
            state: Joi.string().valid('ACTIVO', 'INACTIVO').required(),
        });
    }

}