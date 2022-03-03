import "reflect-metadata";
import {inject, injectable} from "inversify";
import {PersonRepository} from "../../models";
import {PersonMapperDomain} from "../../mappers";
import {PersonRequest} from "../dtos/request/PersonRequest";
import {PersonResponse} from "../dtos/response/PersonResponse";
import {RequestValidation} from "../../helpers";
import {Constants} from "../../constants/Constants";
import {DeleteResult} from "typeorm";

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

    public deletePerson(id: number): Promise<DeleteResult> {
        return this.repository.delete(id);
    }

    private async validatePersonDocument(document: string): Promise<void> {
        let exists;
        await this.repository.existsByDocument(document).then(value => {
            exists = value;
        })
        if (exists) {
            throw new Error(Constants.DOCUMENT_ALREADY_EXISTS);
        }
    }

    private async validatePersonId(id: number): Promise<void> {
        if (id !== null) {
            let exists;
            await this.repository.existsById(id).then(value => {
                exists = value;
            });
            if (!exists) {
                throw new Error(Constants.ID_NOT_VALID);
            }
        } else {
            throw new Error(Constants.ID_NOT_VALID);
        }
    }

}