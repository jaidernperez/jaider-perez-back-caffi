import * as Joi from "joi";
import {PersonRequest} from "../../usecases";

export class RequestValidation {

    public static validateUpdate(request: PersonRequest): void {
        const {error} = RequestValidation.getValidationUpdateRequestSchema()
            .validate(request);

        if (error != null) {
            const {details} = error;
            const message = details.map(i => i.message).join(',');
            throw new Error(message.replace('"',"'"));
        }
    }

    public static validateCreate(request: PersonRequest): void {
        const {error} = RequestValidation.getValidationSaveRequestSchema()
            .validate(request);

        if (error != null) {
            const {details} = error;
            const message = details.map(i => i.message).join(',');
            throw new Error(message.replace('"',"'"));
        }
    }

    private static getValidationUpdateRequestSchema(): Joi.Schema {
        return Joi.object({
            id: Joi.required(),
            name: Joi.string().min(3).max(50).required(),
            documentType: Joi.string().valid('CC', 'TI', 'RC', 'CE').required(),
            document: Joi.string().alphanum().min(4).max(13).required(),
            state: Joi.string().valid('ACTIVO', 'INACTIVO').required(),
        });
    }

    private static getValidationSaveRequestSchema(): Joi.Schema {
        return Joi.object({
            name: Joi.string().min(3).max(50).required(),
            documentType: Joi.string().valid('CC', 'TI', 'RC', 'CE').required(),
            document: Joi.string().alphanum().min(4).max(13).required(),
            state: Joi.string().valid('ACTIVO', 'INACTIVO').required(),
        });
    }

}