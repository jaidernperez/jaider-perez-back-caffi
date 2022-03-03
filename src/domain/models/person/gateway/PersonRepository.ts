import {Person} from "../Person";
import {DeleteResult} from "typeorm";

export interface PersonRepository {

    save(person: Person): Promise<Person>;

    findById(id: number): Promise<Person>;

    findByDocument(document: string): Promise<Person>;

    findAll(): Promise<Person[]>;

    delete(id: number): Promise<DeleteResult>;

    existsByDocument(document: string): Promise<boolean>;

    existsById(id: number): Promise<boolean>;

}