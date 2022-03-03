import "reflect-metadata";
import {Container} from "inversify";

import {PersonController, Server} from "../../infrastructure/entry-points/api-rest";
import {PersonUseCase} from "../../domain/usecases";
import {PersonMapperDomain, PersonMapperDomainImp} from "../../domain/mappers";
import {PersonAdapter, PersonMapperData, PersonMapperDataImpl} from "../../infrastructure/driven-adapters";
import {PersonRepository} from "../../domain/models";

const container = new Container();

container.bind<PersonMapperDomain>(Symbol.for("PersonMapperDomain")).to(PersonMapperDomainImp).inSingletonScope();
container.bind<PersonMapperData>(Symbol.for("PersonMapperData")).to(PersonMapperDataImpl).inSingletonScope();
container.bind<PersonRepository>(Symbol.for("PersonRepository")).to(PersonAdapter).inSingletonScope();
container.bind<PersonUseCase>(Symbol.for("PersonUseCase")).to(PersonUseCase).inSingletonScope();
container.bind<PersonController>(Symbol.for("PersonController")).to(PersonController).inSingletonScope();
container.bind<Server>(Symbol.for("Server")).to(Server).inSingletonScope();

export {container}
