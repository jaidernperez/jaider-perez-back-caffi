import {Person, PersonRepository} from "../../../domain/models";
import {inject, injectable} from "inversify";
import {PersonMapperData} from "../mappers/PersonMapperData";
import {DeleteResult, getConnection, Repository} from "typeorm";
import {PersonData} from "./PersonData";

@injectable()
export class PersonAdapter implements PersonRepository {

    constructor(@inject(Symbol.for("PersonMapperData")) private mapper: PersonMapperData) {
    }

    delete(id: number): Promise<DeleteResult> {
        const personDataRepository: Repository<PersonData> = getConnection().getRepository(PersonData);
        return personDataRepository.delete({id: id});
    }

    findAll(): Promise<Person[]> {
        const personDataRepository: Repository<PersonData> = getConnection().getRepository(PersonData);
        return this.mapper.listDataToEntity(personDataRepository.find());
    }

    findByDocument(document: string): Promise<Person> {
        const personDataRepository: Repository<PersonData> = getConnection().getRepository(PersonData);
        return this.mapper.dataToEntity(personDataRepository.findOneOrFail({document: document}));
    }

    findById(id: number): Promise<Person> {
        const personDataRepository: Repository<PersonData> = getConnection().getRepository(PersonData);
        return this.mapper.dataToEntity(personDataRepository.findOneOrFail({id: id}));
    }

    save(person: Person): Promise<Person> {
        const personDataRepository: Repository<PersonData> = getConnection().getRepository(PersonData);
        return this.mapper.dataToEntity(personDataRepository.save(this.mapper.entityToData(person)));
    }

    async existsByDocument(document: string): Promise<boolean> {
        const personDataRepository: Repository<PersonData> = getConnection().getRepository(PersonData);
        return await personDataRepository.count({document: document}) > 0;
    }

    async existsById(id: number): Promise<boolean> {
        const personDataRepository: Repository<PersonData> = getConnection().getRepository(PersonData);
        return await personDataRepository.count({id: id}) > 0;
    }

}