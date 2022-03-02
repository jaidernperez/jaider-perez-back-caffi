import "reflect-metadata";
import {injectable} from "inversify";

@injectable()
export class PersonUseCase {

    constructor() {
    }

    public home(): Promise<string> {
        return new Promise<string>((resolve, reject) => resolve("Bienvenido a typescript"));
    }
}