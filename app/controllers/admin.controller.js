import jwt from "jsonwebtoken";
import fetch from "node-fetch";

const dash = (req, res) => {
  res.render("dash.ejs");
}

const agregarLibros = (req, res) => {
  res.render("agregar-libros.ejs");
}

const devolucion = (req, res) => {
  res.render("devolucion.ejs");
}

const dashUsuarios = async (req, res) => {
  const alertCase = req.query.alert

  try {
    const url = `http://localhost:3000/api/user`;
    const option = { method: "GET" };
    let datosUsuarios = {};

    await fetch(url, option)
      .then((response) => response.json())
      .then((datosU) => {
        datosUsuarios = datosU;
        console.log(datosUsuarios);

      })
    if (alertCase) {
      switch (alertCase) {
        // sin datos en el formulario
        case "0":
          res.render("dashusuarios", { alertCase: alertCase, usuarios: datosUsuarios });
          // res.render("login")
          break;

        // Usuario añadido
        case "1":
          res.render("dashusuarios", { alertCase: alertCase, usuarios: datosUsuarios })
          break;

        // dni ya registrado  
        case "2":
          res.render("dashusuarios", { alertCase: alertCase, usuarios: datosUsuarios })
          break;

        default:
          res.render("dashusuarios", { alertCase: alertCase, usuarios: datosUsuarios })
          break;
      }
    } else {
      res.render("dashusuarios.ejs", { alertCase: alertCase, usuarios: datosUsuarios })
    }
  } catch (error) {
    console.error(error);
  }

}

const insertarUsuario = async (req, res) => {
  if (req.body.COD_USUARIO) {

    let datosUsuario = {
      "DNI_USUARIO": req.body.COD_USUARIO,
      "NOM_USUARIO": req.body.NOM_USUARIO,
      "APELL_USUARIO": req.body.APELL_USUARIO,
      "CORREO": req.body.CORREO_USUARIO,
      "CONTRASENA": req.body.PASSWORD,
      "FECHA_NAC": req.body.FECHA_NACIMIENTO,
      "SEXO": req.body.sexo,
      "ESTADO": "ACTIVO",
      "COD_ROL": req.body.rol
    }
    if (datosUsuario.DNI_USUARIO && datosUsuario.NOM_USUARIO && datosUsuario.APELL_USUARIO && datosUsuario.CORREO && datosUsuario.CONTRASENA && datosUsuario.FECHA_NAC && datosUsuario.SEXO && datosUsuario.ESTADO && datosUsuario.COD_ROL) {
      try {
        const url = 'http://localhost:3000/api/user';
        const option = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(datosUsuario)
        }

        await fetch(url, option)
          .then(response => response.json())
          .then(resRegistro => {

            if (resRegistro.message === "Usuario añadido") { // El usuario se registrò correctamente
              return res.redirect("/admin/usuarios?alert=1")
            } else if (resRegistro.message === "El DNI ingresado ya existe") { // El usuario ingreso un documento que ya se encuentro registrado
              return res.redirect("/admin/usuarios?alert=2")
            }
          })
      } catch (error) {
        console.log(error);
      }
      // res.send(datosUsuario)
    } else {
      return res.redirect("/admin/usuarios?alert=0")
    }
  }

}

const eliminarUsuario = async (req, res) => {
  const id = req.query.id;
  const url = `http://localhost:3000/api/user/${id}`;
  const option = {
    method: "DELETE"
  };
  const result = await fetch(url, option)
    .then(response => response.json())
    .then(data => {
      if (data.affectedRows == 1) {

        console.log("borrado");
      } else {
        console.log("NO BORRADO");
      }

    })
  res.redirect("/admin/usuarios");
}


const dashLibros = async (req, res) => {
  const alertCase = req.query.alert

  try {
    const url = `http://localhost:3000/api/books`;
    const option = { method: "GET" };
    let datosLibros = {};

    await fetch(url, option)
      .then((response) => response.json())
      .then((datosL) => {
        datosLibros = datosL;
        console.log(datosLibros);

      })
    if (alertCase) {
      switch (alertCase) {
        // sin datos en el formulario
        case "0":
          res.render("dashlibros", { alertCase: alertCase, libros: datosLibros });
          // res.render("login")
          break;

        // Usuario añadido
        case "1":
          res.render("dashlibros", { alertCase: alertCase, libros: datosLibros });
          break;

        // dni ya registrado  
        case "2":
          res.render("dashlibros", { alertCase: alertCase, libros: datosLibros });
          break;

        default:
          res.render("dashlibros", { alertCase: alertCase, libros: datosLibros });
          break;
      }
    } else {
      res.render("dashlibros", { alertCase: alertCase, libros: datosLibros });
    }
  } catch (error) {
    console.error(error);
  }

}

const insertarLibros = async (req, res) => {
  if (req.body.COD_LIBRO) {

    let datosLibro = {
      "COD_LIBRO": req.body.COD_LIBRO,
      "SIPNOPSIS": req.body.SIPNOPSIS,
      "TITULO": req.body.TITULO,
      "FECHA_PUBLICACION": req.body.FECHA_PUBLICACION,
      "NUM_SERIE": req.body.NUM_SERIE,
      "EDITORIAL": req.body.EDITORIAL,
      "GENERO": req.body.COD_GENERO,
      "NOM_AUTOR": req.body.NOM_AUTOR,
      "IMAGEN": req.body.IMAGEN,
    }
    if (datosLibro.COD_LIBRO && datosLibro.SIPNOPSIS && datosLibro.TITULO && datosLibro.FECHA_PUBLICACION && datosLibro.NUM_SERIE && datosLibro.EDITORIAL && datosLibro.GENERO && datosLibro.NOM_AUTOR && datosLibro.IMAGEN) {
      try {
        const url = 'http://localhost:3000/api/books';
        const option = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(datosLibro)
        }

        await fetch(url, option)
          .then(response => response.json())
          .then(resRegistro => {
            res.redirect('hola')
            // if (resRegistro.message === "Usuario añadido") { // El usuario se registrò correctamente
            //   return res.redirect("/admin/usuarios?alert=1")
            // } else if (resRegistro.message === "El DNI ingresado ya existe") { // El usuario ingreso un documento que ya se encuentro registrado
            //   return res.redirect("/admin/usuarios?alert=2")
            // }
          })
      } catch (error) {
        console.log(error);
      }
      // res.send(datosUsuario)
    } else {
      return res.redirect("/admin/libros")
      console.log("No se")
    }
  }

}

const editarLibros = async (req, res) => {
  if (req.body.COD_LIBRO) {
    let datosLibro = {
      "SIPNOPSIS": req.body.SIPNOPSIS,
      "TITULO": req.body.TITULO,
      "FECHA_PUBLICACION": req.body.FECHA_PUBLICACION,
      "NUM_SERIE": req.body.NUM_SERIE,
      "EDITORIAL": req.body.EDITORIAL,
      "GENERO": req.body.COD_GENERO,
      "NOM_AUTOR": req.body.NOM_AUTOR,
      "IMAGEN": req.body.IMAGEN,
    };

    if (
      datosLibro.SIPNOPSIS &&
      datosLibro.TITULO &&
      datosLibro.FECHA_PUBLICACION &&
      datosLibro.NUM_SERIE &&
      datosLibro.EDITORIAL &&
      datosLibro.GENERO &&
      datosLibro.NOM_AUTOR &&
      datosLibro.IMAGEN
    ) {
      try {
        const url = `http://localhost:3000/api/books/${COD_LIBRO}`;  // URL del libro específico a actualizar
        const option = {
          method: "PUT",  // Método HTTP PUT para actualizar el libro
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(datosLibro)
        };

        await fetch(url, option)
          .then(response => response.json())
          .then(resRegistro => {
            // Realizar acciones según la respuesta del servidor
            // Redirigir a una página específica después de la actualización
            res.redirect("holacion");
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      return res.redirect("/admin/libros");
      console.log("No se");
    }
  }
};

const eliminarLibros = async (req, res) => {
  const id = req.query.id;
  const url = `http://localhost:3000/api/books/${id}`;
  const option = {
    method: "DELETE"
  };

  const result = await fetch(url, option)
    .then(response => response.json())
    .then(data => {
      if (data.affectedRows == 1) {

        console.log("borrado");
      } else {
        console.log("NO BORRADO");
      }

    })
  return res.redirect("/admin/libros");
}

const dashPrestamos = async (req, res) => {
  try {
    const url = `http://localhost:3000/api/loan-header`;
    const option = { method: "GET" };
    let dataPrestamo = {};

    await fetch(url, option)
      .then((response) => response.json())
      .then((datosP) => {
        dataPrestamo = datosP;
        console.log(dataPrestamo);

      })
    res.render("dashprestamos", { prestamos: dataPrestamo });
  } catch (error) {
    res.render("dashprestamos", { prestamos: dataPrestamo });
  }
  // res.render("dashprestamos",{prestamos: dataPrestamo});
}

const eliminarPrestamos = async (req, res) => {

  const id = req.query.id;
  const url = `http://localhost:3000/api/loan-header/${id}`;
  const option = {
    method: "DELETE"
  };
  const result = await fetch(url, option)
    .then(response => response.json())
    .then(data => {
      if (data.affectedRows == 1) {

        console.log("borrado");
      } else {
        console.log("NO BORRADO");
      }
    })
  return res.redirect("/admin/prestamos");
}

export const adminController = {
  dash,
  agregarLibros,
  devolucion,
  dashUsuarios,
  dashLibros,
  dashPrestamos,
  insertarUsuario,
  eliminarUsuario,
  eliminarLibros,
  eliminarPrestamos,
  insertarLibros,
  editarLibros
}