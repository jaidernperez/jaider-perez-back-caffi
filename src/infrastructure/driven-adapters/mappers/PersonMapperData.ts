import {Person} from "../../../domain/models";
import {PersonData} from "../person/PersonData";

export interface PersonMapperData {

    dataToEntity(data: Promise<PersonData>): Promise<Person>;

    entityToData(entity: Person): PersonData;

    listDataToEntity(listData: Promise<PersonData[]>): Promise<Person[]>;
}