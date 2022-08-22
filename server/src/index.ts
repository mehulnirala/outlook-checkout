import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";
import { createPayment, initClient } from "./checkout/index";

dotenv.config();
initClient();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req: Request, res: Response) => {
  res.send("done!");
});

app.post("/", (req: Request, res: Response) => {
  res.send("done!");
});

app.post("/checkout", (req: Request, res: Response) => {
  createPayment(req.body)
    .then((data) => res.send(JSON.stringify(data)))
    .catch((err) => res.send(err))
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
