const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
var knex = require("knex");

const register = require("./controllers/register");
const image = require("./controllers/image");
const signIn = require("./controllers/signIn");
const profile = require("./controllers/profile");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const db = knex({
  client: "pg",
  version: "7.2",
  connection: {
    host: "127.0.0.1",
    user: "michalwanto",
    password: " ",
    database: "smart-brain",
  },
});

app.get("/", (req, res) => {
  res.json(database);
});

app.post("/signin", (req, res) => {
  signIn.handleSignIn(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageUrl", (req, res) => {
  image.handleApi(req, res, db);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, bcrypt, db);
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT} `);
});
