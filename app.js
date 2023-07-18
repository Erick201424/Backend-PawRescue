import express from "express";
import cors from "cors";

import { api } from "./config/config.js";
import swaggerDocs from "./config/swagger.config.js";

import user from "./routes/user.routes.js"
import pet from "./routes/pet.routes.js"
import ads from "./routes/ads.routes.js"

const app = express();

app.use(cors());

app.use(express.json());

//routes
app.use("/api/user", user);
app.use("/api/ads", ads);
app.use("/api/pet", pet);

app.listen(api.port, () => {
    console.log(`Servidor corriento en el puerto => ${api.port}`);
    swaggerDocs(app, api.port);
});