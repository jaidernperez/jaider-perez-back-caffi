import "reflect-metadata";
import {inject, injectable} from "inversify";
import * as express from "express";
import {PersonUseCase} from "../../../../domain/usecases";

@injectable()
export class PersonController {

    constructor(@inject(Symbol.for("PersonUseCase")) private loanUseCase: PersonUseCase) {
    }

    public routes(app: express.Application): void {
        app.route("/persons").get((req: express.Request, res: express.Response) => {
            this.loanUseCase.findAllPersons().then((response) => {
                res.status(200).send({
                    response
                });
            }).catch(reason => {
                res.status(400).send({
                    "error": reason
                });
            });
        });

        app.route("/persons/save").post((req: express.Request, res: express.Response) => {
            this.loanUseCase.createPerson(req.body).then((response) => {
                res.status(200).send({
                    response
                });
            }).catch(reason => {
                res.status(400).send({
                    "error": reason
                });
            });
        });

        app.route("/persons/update").post((req: express.Request, res: express.Response) => {
            this.loanUseCase.updatePerson(req.body).then((response) => {
                res.status(200).send({
                    response
                });
            }).catch(reason => {
                res.status(400).send({
                    "error": reason
                });
            });
        });

        app.route("/persons/:id").get((req: express.Request, res: express.Response) => {
            this.loanUseCase.findPersonById(Number(req.params.id)).then((response) => {
                res.status(200).send({
                    response
                });
            }).catch(reason => {
                res.status(400).send({
                    "error": reason
                });
            });
        });

        app.route("/persons/:document").get((req: express.Request, res: express.Response) => {
            this.loanUseCase.findPersonByDocument(req.params.document).then((response) => {
                res.status(200).send({
                    response
                });
            }).catch(reason => {
                res.status(400).send({
                    "error": reason
                });
            });
        });

        app.route("/persons/:id").delete((req: express.Request, res: express.Response) => {
            this.loanUseCase.deletePerson(Number(req.params.id)).then((response) => {
                res.status(200).send({
                    response
                });
            }).catch(reason => {
                res.status(400).send({
                    "error": reason
                });
            });
        });
    }
}