import 'dotenv/config';
import {container} from "./config/config";
import {Server} from "../infrastructure/entry-points/api-rest";
import {connectDB} from "../infrastructure/driven-adapters";

const PORT = Number(process.env.PORT) || 3000;

const bootstrap = async () => {
    const server = container.get<Server>(Symbol.for("Server"));
    await connectDB()
    return server;
}

bootstrap().then(server => {
    console.log(`Server is listening on localhost:${PORT}, open your browser on http://localhost:${PORT}/`);
    server.start(PORT);
}).catch(reason => console.log(reason));
