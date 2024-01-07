import express from "express";
import mongoose, { MongooseError } from "mongoose";
import routes from "./routes";
require("dotenv").config();

const serverHost = process.env.HOST || "localhost";
const serverPort = process.env.PORT || 8080;

const databaseHost = process.env.DB_HOST || "localhost";
const databasePort = process.env.DB_PORT || 27017;
const databaseName = process.env.DB_NAME;
const databaseUser = process.env.DB_USER;
const databasePassword = process.env.DB_PASSWORD;

const databaseOptions: mongoose.ConnectOptions = {
  auth: {
    username: databaseUser,
    password: databasePassword,
  },
};

if (!databaseName) {
  console.error("No database name provided. Please add DB_NAME to .env");
  process.exit(1);
}

const app = express();
mongoose
  .connect(
    `mongodb://${databaseHost}:${databasePort}/${databaseName}`,
    databaseOptions ? databaseOptions : {}
  )
  .then(() =>
    console.log(
      `Connected to database on mongodb://${databaseHost}:${databasePort}/${databaseName}`
    )
  )
  .catch((err) => {
    console.error(
      `Error occured :: "${err.name}": ${err.message}`,
      err.stack || ""
    );
  });

app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`Server now listens on http://${serverHost}:${serverPort}`);
});
