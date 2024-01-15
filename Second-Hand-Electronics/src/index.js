const express = require("express");
const router = require("./routes");
const handlebarsConfig = require("./config/handlebarsConfig");
const expressConfig = require("./config/expressConfig");
const dbConnect = require("./config/dbConfig");

const PORT = 3000;

const app = express();

handlebarsConfig(app);
expressConfig(app);
app.use(router);

dbConnect()
  .then(() => console.log("Successfully connected to the DB!"))
  .catch((err) => console.log(`Error while connecting in DB: ${err}`));

app.listen(PORT, console.log(`Listening on ${PORT}`));