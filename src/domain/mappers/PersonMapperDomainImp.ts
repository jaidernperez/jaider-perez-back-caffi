import {PersonMapperDomain} from "./PersonMapperDomain";
import {PersonRequest, PersonResponse} from "../usecases";
import {Person} from "../models";

export class PersonMapperDomainImp implements PersonMapperDomain {

    async entityToResponseProm(entity: Promise<Person>): Promise<PersonResponse> {
        let personResponse = new PersonResponse();
        await entity.then(person => {
            personResponse.id = person.id;
            personResponse.name = person.name;
            personResponse.documentType = person.documentType;
            personResponse.document = person.document;
            personResponse.state = person.state;
        });
        return Promise.resolve(personResponse);
    }

    entityToResponse(entity: Person): PersonResponse {
        let personResponse = new PersonResponse();
        personResponse.id = entity.id;
        personResponse.name = entity.name;
        personResponse.documentType = entity.documentType;
        personResponse.document = entity.document;
        personResponse.state = entity.state;
        return personResponse;
    }

    requestToEntity(request: PersonRequest): Person {
        let personEntity = new Person();
        if (request.id !== null) personEntity.id = request.id
        personEntity.name = request.name;
        personEntity.documentType = request.documentType;
        personEntity.document = request.document;
        return personEntity;
    }

    async listEntityToResponse(entityList: Promise<Person[]>): Promise<PersonResponse[]> {
        let personsResponse = [];
        await entityList.then(list => {
            list.forEach(person => {
                personsResponse.push(this.entityToResponse(person));
            });
        })
        return personsResponse;
    }

}