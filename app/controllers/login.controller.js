import jwt from "jsonwebtoken";
import fetch from "node-fetch";

const authentication = async (req, res) => {
  const COD_USUARIO = req.body.COD_USUARIO;
  const CONTRASENA = req.body.PASSWORD;

  if (COD_USUARIO && CONTRASENA) {
    try {

      const url = `http://localhost:3000/api/user/${COD_USUARIO}`;
      const options = { method: "GET" };
      let payload = {};

      // Con la variable COD_USUARIO realizamos uan busqueda en la api para obtener los datos del usuario
      // En caso de no existir, se redirecciona al login nuevamente
      await fetch(url, options)
        .then((response) => response.json())
        .then((datosUsuario) => {
          if (!datosUsuario.message) {
            payload = datosUsuario[0];
          } else {
            return res.redirect('/login?alert=1')
          }
        });

      // creamos una variable token donde mandamos como primer parametro los datos a encriptar y luego la secret key con la cual se desencriptará
      if (CONTRASENA === payload.CONTRASENA) {
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: process.env.EXPIRE_TOKEN,
        });

        res.cookie("cookieBG", token);
        return res.redirect("/user/perfil");
      } else {
        return res.redirect("/login?alert=2");
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    return res.redirect("/login?alert=0");
  }
};

const render = async (req, res) => {

  const alertCase = req.query.alert

  if (alertCase) {
    switch (alertCase) {
      // sin datos en el formulario
      case "0":
        res.render("login", { alertCase: alertCase })
        break;

      // Usuario no existente
      case "1":
        res.render("login", { alertCase: alertCase })
        break;

      // Contraseña incorrecta  
      case "2":
        res.render("login", { alertCase: alertCase })
        break;

      // Registro exitoso 
      case "3":
        res.render("login", { alertCase: alertCase })
        break;

      // DNI ya se encuentra registrado
      case "4":
        res.render("login", { alertCase: alertCase })
        break;

      // DNI ya se encuentra registrado
      case "5":
        res.render("login", { alertCase: alertCase })
        break;

      default:
        res.render("login", { alertCase: false })
        break;
    }
  } else {
    res.render("login", { alertCase: false })
  }

};

const registro = async (req, res) => {
  // valida el sexo del usuario
  let validarSexo = ''
  if (req.body.SEXO_USUARIO) {
    switch (req.body.SEXO_USUARIO) {
      case "M":
        validarSexo = "MASCULINO"
        break;

      case "F":
        validarSexo = "FEMENINO"
        break;

      default:
        return res.redirect("/login?alert=0")
    }
  } else {
    return res.redirect("/login?alert=0")
  }

  // objeto que almaneca los datos del usuario para el registro
  let datosUsuario = {
    "DNI_USUARIO": req.body.COD_USUARIO,
    "NOM_USUARIO": req.body.NOM_USUARIO,
    "APELL_USUARIO": req.body.APELL_USUARIO,
    "CORREO": req.body.CORREO_USUARIO,
    "CONTRASENA": req.body.PASSWORD,
    "FECHA_NAC": req.body.FECHA_NACIMIENTO,
    "SEXO": validarSexo,
    "ESTADO": "ACTIVO",
    "COD_ROL": 1
  }

  // Valida si nos datos necesarios para el registro si existen
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
            return res.redirect("/login?alert=3")
          } else if (resRegistro.message === "El DNI ingresado ya existe") { // El usuario ingreso un documento que ya se encuentro registrado
            return res.redirect("/login?alert=4")
          }
        })
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.redirect("/login?alert=0")
  }
};

const logout = (req, res) => {
  if (req.cookies.cookieBG) {
    let alertCase = req.query.alert || "418";
    res.clearCookie('cookieBG')
    res.redirect(`/login?alert=${alertCase}`)
  }else{
    res.redirect('/')
  }
};

export const loginController = {
  authentication,
  render,
  registro,
  logout
};
