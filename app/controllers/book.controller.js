import fetch from "node-fetch";

const infoLibro = async (req, res) => {
  if (req.query.COD_LIBRO) {
    let COD_LIBRO = req.query.COD_LIBRO;
    let session = false;

    let url = `http://localhost:3000/api/books/${COD_LIBRO}`;
    let options = { method: "GET" };
    let infoLibro = {};

    await fetch(url, options)
      .then((respuesta) => respuesta.json())
      .then((data) => {
        if (!data.message) {
          infoLibro = data[0];
        } else {
          res.redirect("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });

      if (req.cookies.cookieBG){
        session = true
      }

    res.render("pagina.ejs", { infoLibro: infoLibro, session:session });
  } else {
    res.redirect("/");
  }
};

const authPrestamo = (req, res) => {
  res.render("auth.ejs");
};

const confirmPrestamo = (req, res) => {
  let session = false;

  if (req.cookies.cookieBG){
    session = true
  }

  res.render("confirm.ejs", {session:session});
};

const prestamo = (req, res) => {
  let session = false;

  if (req.cookies.cookieBG){
    session = true
  }

  res.render("prestamo.ejs", {session:session});
};

export const bookController = {
  infoLibro,
  authPrestamo,
  confirmPrestamo,
  prestamo
};
