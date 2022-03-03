import * as Joi from "joi";
import {PersonRequest} from "../../usecases";
import {Constants} from "../../constants/Constants";

export class RequestValidation {

    public static validate(request: PersonRequest): void {
        const {error} = RequestValidation.getValidationRequestSchema()
            .validate(request);

        if (error != null) {
            const {details} = error;
            const message = details.map(i => i.message).join(',');
            throw new Error(message.replace('"',"'"));
        }
    }

    public static async validateAsync(request: PersonRequest): Promise<string> {
        return await RequestValidation.getValidationRequestSchema()
            .validateAsync(request);
    }

    private static getValidationRequestSchema(): Joi.Schema {
        return Joi.object({
            name: Joi.string().alphanum().min(3).max(50).required(),
            documentType: Joi.string().valid('CC', 'TI', 'RC', 'CE').required(),
            document: Joi.string().alphanum().min(4).max(13).required(),
            state: Joi.string().valid('ACTIVO', 'INACTIVO').required(),
        });
    }

}