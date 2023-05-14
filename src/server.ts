import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errors } from "celebrate";
import bodyParser from "body-parser";
import { connectDatabase } from "./Database/DatabaseConfig";
import router from "./Routers/index.routes";
import path from "path";

dotenv.config();

const port = process.env.PORT || 5000;

const app: express.Application = express();

//connect Database
connectDatabase();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

// api router
app.use("/api", router);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use(errors());
app.listen(port, () => {
  console.log("Server is running at", Number(port));
});
