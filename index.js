import express from "express";
import { logger } from "./middleware/logger.js";
import { categoriesRouter } from "./routes/categories.js";
import { moviesRouter } from "./routes/movies.js";
import { usersRouter } from "./routes/users.js";
import { login, myProfile}  from './Controller/UsersController.js';
import { findUserByEmail, verifyPassword, validateLogin, requireAuth } from './middleware/authValidator.js';
import cookieParser from "cookie-parser";

// Création de l'application Express
const app = express();

// Port du serveur, par défaut 3000 ou défini par la variable d'environnement SERVER_PORT
const serverPort = process.env.SERVER_PORT ?? 3000;

// ---------------MIDDLEWARE ---------------------------

// middleware express.json() pour parser le corps des requêtes en JSON
app.use(express.json());
// log method, url and date of the request
app.use(logger); 
app.use(cookieParser()); // Middleware pour parser les cookies

// ---------------ROUTE INDEX ---------------------------

app.use("/movies", moviesRouter);
app.use("/categories", categoriesRouter);
app.use("/users", usersRouter);
app.post("/login", validateLogin, findUserByEmail, verifyPassword, login);
app.get("/my-profile", requireAuth, myProfile )

// ---------------ROUTE Controller ---------------------------


app.get("/", (req, res) => {
  console.log(`Requête reçue : ${req.method} ${req.url}`);
  res.send("<h1>Hello User ! Welcome in API CineZone</h1>");
});


app.listen(serverPort, () => {
  console.info(`Listening on port http://localhost:${serverPort}`);
});
