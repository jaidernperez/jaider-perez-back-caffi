import {PersonMapperData} from "./PersonMapperData";
import {PersonData} from "../person/PersonData";
import {Person} from "../../../domain/models";
import {injectable} from "inversify";

@injectable()
export class PersonMapperDataImpl implements PersonMapperData {

    async dataToEntity(data: Promise<PersonData>): Promise<Person> {
        let person: Person = new Person();
        await data.then(personData => {
            person.id = personData.id;
            person.name = personData.name;
            person.documentType = personData.documentType;
            person.document = personData.document;
            person.state = personData.state;
            person.createdDate = personData.createdDate;
            person.updateDate = personData.updateDate;
        });
        return Promise.resolve(person);
    }

    entityToData(entity: Person): PersonData {
        let personData: PersonData = new PersonData();
        if (entity.id !== null) personData.id = entity.id;
        personData.name = entity.name;
        personData.documentType = entity.documentType;
        personData.document = entity.document;
        personData.state = entity.state;
        personData.createdDate = entity.createdDate;
        personData.updateDate = entity.updateDate;
        return personData;
    }

    async listDataToEntity(listData: Promise<PersonData[]>): Promise<Person[]> {
        let personEntity = [];
        await listData.then(list => {
            list.forEach(personData => {
                personEntity.push(PersonMapperDataImpl.dataToEntityObj(personData));
            });
        })
        return personEntity;
    }

    private static dataToEntityObj(data: PersonData): Person {
        let person = new Person();
        person.id = data.id;
        person.name = data.name;
        person.documentType = data.documentType;
        person.document = data.document;
        person.state = data.state;
        return person;
    }

}