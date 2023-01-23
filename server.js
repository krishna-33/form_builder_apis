const express = require("express");
const Router = require("./routes")
const dbConnection = require("./config/db.config");
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());

dbConnection();

app.use(Router);

app.listen(3001, () => {
  console.log("Server is running at port 3001");
});