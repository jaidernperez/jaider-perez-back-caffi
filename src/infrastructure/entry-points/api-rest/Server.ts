import {inject, injectable} from "inversify";
import * as express from "express";
import * as bodyParser from "body-parser";
import {PersonController} from "./controllers/PersonController";

@injectable()
export class Server {

    constructor(@inject(Symbol.for("PersonController")) private loanController: PersonController) {
    }

    public start(port: number): void {
        let app = express();
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: false}));
        this.loanController.routes(app);
        app.listen(port);
    }
}