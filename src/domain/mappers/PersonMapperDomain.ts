import {PersonRequest, PersonResponse} from "../usecases";
import {Person} from "../models";

export interface PersonMapperDomain {

    entityToResponse(entity: Promise<Person>): Promise<PersonResponse>;

    requestToEntity(request: PersonRequest): Person;

    listEntityToResponse(entityList: Promise<Person[]>): Promise<PersonResponse[]>

}