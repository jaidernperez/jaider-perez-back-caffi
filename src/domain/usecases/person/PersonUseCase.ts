import "reflect-metadata";
import {inject, injectable} from "inversify";
import {PersonRepository} from "../../models";
import {PersonMapperDomain} from "../../mappers";
import {PersonRequest} from "../dtos/request/PersonRequest";
import {PersonResponse} from "../dtos/response/PersonResponse";
import {RequestValidation} from "../../helpers";
import {Constants} from "../../constants/Constants";

@injectable()
export class PersonUseCase {

    constructor(@inject(Symbol.for("PersonRepository")) private repository: PersonRepository,
                @inject(Symbol.for("PersonMapperDomain")) private mapper: PersonMapperDomain) {
    }

    public findPersonById(id: number): Promise<PersonResponse> {
        return this.mapper.entityToResponse(this.repository.findById(id)).catch(() => {
            throw new Error(Constants.PERSON_NOT_FOUND);
        });
    }

    public findPersonByDocument(document: string): Promise<PersonResponse> {
        return this.mapper.entityToResponse(this.repository.findByDocument(document)).catch(() => {
            throw new Error(Constants.PERSON_NOT_FOUND);
        });
    }

    public createPerson(request: PersonRequest): Promise<PersonResponse> {
        RequestValidation.validateCreate(request);
        this.validatePersonDocument(request.document).then(() => {
        });
        return this.mapper.entityToResponse(this.repository.save(this.mapper.requestToEntity(request)));
    }

    public updatePerson(request: PersonRequest): Promise<PersonResponse> {
        this.validatePersonId(request.id).then(() => {
        });
        RequestValidation.validateUpdate(request);
        return this.mapper.entityToResponse(this.repository.save(this.mapper.requestToEntity(request)));
    }

    public findAllPersons(): Promise<PersonResponse[]> {
        return this.mapper.listEntityToResponse(this.repository.findAll());
    }

    public async deletePerson(id: number): Promise<String> {
        if ((await this.repository.delete(id)).affected == 1){
            return Promise.resolve(Constants.PERSON_DELETED_SUCCESSFULLY);
        } else {
            return Promise.resolve(Constants.PERSON_NOT_FOUND);
        }
    }

    private async validatePersonDocument(document: string): Promise<Error> {
        let exists;
        await this.repository.existsByDocument(document).then(value => {
            exists = value;
        })
        if (exists) {
            return new Error(Constants.DOCUMENT_ALREADY_EXISTS);
        }
    }

    private async validatePersonId(id: number): Promise<Error> {
        if (id !== null) {
            let exists;
            await this.repository.existsById(id).then(value => {
                exists = value;
            });
            if (!exists) {
                return new Error(Constants.ID_NOT_VALID);
            }
        } else {
            return new Error(Constants.ID_NOT_VALID);
        }
    }

}