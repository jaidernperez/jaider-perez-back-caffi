import {PersonRequest, PersonResponse} from "../usecases";
import {Person} from "../models";

export interface PersonMapperDomain {

    entityToResponseProm(entity: Promise<Person>): Promise<PersonResponse>;

    entityToResponse(entity: Person): PersonResponse;

    requestToEntity(request: PersonRequest): Person;

    listEntityToResponse(entityList: Promise<Person[]>): Promise<PersonResponse[]>

}