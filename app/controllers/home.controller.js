import { Buffer } from "node:buffer";
import fetch from "node-fetch";
import { fileTypeFromBuffer } from "file-type";
import jwt from "jsonwebtoken";

const index = async (req, res) => {
  try {
    let url = "http://localhost:3000/api/books/";
    let options = { method: "GET" };
    let datosLibro = {};
    let session = false;

    await fetch(url, options)
      .then((response) => response.json())
      .then(async (data) => {
        let convert = await Promise.all(data.map(async (element) => {
          // Almacenamos el objeto que contiene el buffer de las portadas en una variable
          let datosImagen = element.IMAGEN;

          // Si datosImagen contiene un objeto dentro, convertimos el objeto a buffer
          let buffer = datosImagen ? Buffer.from(datosImagen) : null;
          // Si buffer no está vacio, se saca el mimetype con la funcion fileTypeFromBuffer();
          let mimeType = buffer ? await fileTypeFromBuffer(buffer) : null;
          // console.log(mimeType);

          return {
            COD_LIBRO: element.COD_LIBRO,
            SIPNOPSIS: element.SIPNOPSIS,
            TITULO: element.TITULO,
            FECHA_PUBLICACION: element.FECHA_PUBLICACION,
            NUM_SERIE: element.NUM_SERIE,
            COD_GENERO: element.COD_GENERO,
            COD_AUTOR: element.COD_AUTOR,
            IMAGEN: buffer ? { base64: buffer.toString("base64"), mimetype: mimeType } : null,
          };
        }));

        if (req.cookies.cookieBG){
          session = true
        }

        datosLibro = convert;
        res.render("index", { libros: datosLibro, session: session });
      });
  } catch (error) {
    console.error(error);
  }
};

const genero = (req, res) => {
  let session = false;
  
  if (req.cookies.cookieBG){
    session = true
  };

  res.render("pagina-genero.ejs",{session: session});
};

export const homeController = {
  index,
  genero
};
