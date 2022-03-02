import {Person} from "../Person";

export interface PersonRepository {

    save(person: Person): Promise<Person>;

    findById(id: number): Promise<Person>;

    findByDocument(document: string): Promise<Person>;

    findAll(): Promise<Person[]>;

    delete(id: number): void;

}