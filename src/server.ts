import "dotenv/config";
import express from "express";
var cors = require('cors');
import { contentType } from "./infra/http/middlewares/content-type";
import router from "./infra/http/router/router";
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(contentType);
app.use(router);

app.listen(PORT);