import 'dotenv/config';
import {container} from "./config/config";
import {Server} from "../infrastructure/entry-points/api-rest";

const PORT = Number(process.env.PORT) || 3000;

const bootstrap = async () => {
    return container.get<Server>(Symbol.for("Server"));
}

bootstrap().then(server => {
    console.log(`Server is listening on localhost:${PORT}, open your browser on http://localhost:${PORT}/`);
    server.start(PORT);
}).catch(reason => console.log(reason));
