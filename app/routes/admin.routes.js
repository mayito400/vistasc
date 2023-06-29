import { Router } from "express";
import{adminController} from '../controllers/admin.controller.js'
import { validateToken } from "../middlewares/token.js";
import { validateAdmin } from "../middlewares/valAdmin.js";

const admin = Router();

// Vista principal del administrador
admin.get("/", validateToken, validateAdmin, adminController.dash);

//vista para el formulario para agregar libros
admin.get("/agregar", validateToken, validateAdmin, adminController.agregarLibros );

//vista para el formulario la devolucion de libros
admin.get("/devolucion", validateToken, validateAdmin, adminController.devolucion );

//vista de usuarios para administration
admin.get("/usuarios", validateToken, validateAdmin, adminController.dashUsuarios );
admin.post("/insertarUsuario", validateToken, validateAdmin, adminController.insertarUsuario)
admin.get("/eliminarUsuario", validateToken, validateAdmin, adminController.eliminarUsuario)

//vista de los libros para administration
admin.get("/libros", validateToken, validateAdmin, adminController.dashLibros);
admin.post("/insertarLibros", validateToken, validateAdmin, adminController.insertarLibros)
admin.post("/editarLibros", validateToken, validateAdmin, adminController.editarLibros)
admin.get("/eliminarLibros", validateToken, validateAdmin, adminController.eliminarLibros )


//vista de los prestamos para administration
admin.get("/prestamos", validateToken, validateAdmin, adminController.dashPrestamos);
admin.get("/eliminarPrestamos", validateToken, validateAdmin, adminController.eliminarPrestamos);

export default admin;
