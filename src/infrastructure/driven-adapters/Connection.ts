import 'dotenv/config';
import {createConnection} from "typeorm";
import {PersonData} from "./person/PersonData";

export const connectDB = (): Promise<any> => {
    return createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "postgres",
        database: "db_person",
        entities: [PersonData],
        synchronize: true
    });
}