import "reflect-metadata";
import {Container} from "inversify";

import {PersonController, Server} from "../../infrastructure/entry-points/api-rest";
import {PersonUseCase} from "../../domain/usecases";

const container = new Container();

container.bind<PersonUseCase>(Symbol.for("PersonUseCase")).to(PersonUseCase).inSingletonScope();
container.bind<PersonController>(Symbol.for("PersonController")).to(PersonController).inSingletonScope();
container.bind<Server>(Symbol.for("Server")).to(Server).inSingletonScope();

export {container}
