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
        return this.mapper.entityToResponseProm(this.repository.findById(id));
    }

    public findPersonByDocument(document: string): Promise<PersonResponse> {
        return this.mapper.entityToResponseProm(this.repository.findByDocument(document));
    }

    public createPerson(request: PersonRequest): Promise<PersonResponse> {
        RequestValidation.validate(request);
        this.validatePersonDocument(request.document);
        return this.mapper.entityToResponseProm(this.repository.save(this.mapper.requestToEntity(request)));
    }

    public updatePerson(request: PersonRequest): Promise<PersonResponse> {
        this.validatePersonId(request.id);
        RequestValidation.validate(request);
        this.validatePersonDocument(request.document);
        return this.mapper.entityToResponseProm(this.repository.save(this.mapper.requestToEntity(request)));
    }

    public findAllPersons(): Promise<PersonResponse[]> {
        return this.mapper.listEntityToResponse(this.repository.findAll());
    }

    private validatePersonDocument(document: string): void {
        if (this.repository.existByDocument(document)) {
            throw new Error(Constants.DOCUMENT_ALREADY_EXISTS);
        }
    }

    private validatePersonId(id: number): void {
        if (id !== null && this.repository.existsById(id)) {
            throw new Error(Constants.ID_NOT_VALID);
        }
    }

}