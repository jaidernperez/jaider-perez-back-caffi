import "reflect-metadata";
import {inject, injectable} from "inversify";
import * as express from "express";
import {PersonUseCase} from "../../../../domain/usecases";

@injectable()
export class PersonController {

    constructor(@inject(Symbol.for("PersonUseCase")) private loanUseCase: PersonUseCase) {
    }

    public routes(app: express.Application): void {
        app.route("/home").get((req: express.Request, res: express.Response) => {
            this.loanUseCase.home().then((response) => {
                res.status(200).send({
                    message: response
                });
            })
        })
    }
}