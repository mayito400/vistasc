import { Router } from "express";
import { bookController } from "../controllers/book.controller.js";
import { validateToken } from "../middlewares/token.js";
import { validateState } from "../middlewares/valEstado.js";
const book = Router();

// vista para la pagina individual
book.get("/pagina", validateState, bookController.infoLibro);

// vista autentificacion de prestamo
book.get("/auth", validateToken, validateState, bookController.authPrestamo);
// vista para la confirmacion de prestamo
book.get("/confirm", validateToken, validateState, bookController.confirmPrestamo);
// vista para el prestamo
book.get("/prestamo", validateToken, validateState, bookController.prestamo);

export default book;
