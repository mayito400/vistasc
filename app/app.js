import express from "express";
import dotenv from "dotenv";
import ejs from "ejs";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import * as url from "url";

//* Imports de rutas
import home from "./routes/home.routes.js";
import login from "./routes/login.routes.js";
import user from "./routes/user.routes.js";
import admin from "./routes/admin.routes.js";
import book from "./routes/book.routes.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

dotenv.config();
const app = express();

//* CONFIGURATION
app.set("port", process.env.PORT || 9999);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//* MIDDLEWARE
app.use(express.json());
app.use("/assets", express.static(__dirname + "../public"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

//* ROUTES
app.use("/", home);
app.use("/", login);
app.use("/user", user);
app.use("/admin", admin);
app.use("/libro", book);

// Ruta por defecto al ingresar una ruta desconocida
app.use((req, res) => {
  res.render("404.ejs");
});

export default app;
