const express = require("express");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const libros = [
  {
    id: 1,
    titulo: "Harry Potter",
    autor: "J.K. Rowling",
    imagen: "https://covers.openlibrary.org/b/id/10521270-L.jpg"
  },
  {
    id: 2,
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    imagen: "https://m.media-amazon.com/images/I/71tmow7B+FL.jpg"
  },
  {
    id: 3,
    titulo: "Percy Jackson",
    autor: "Rick Riordan",
    imagen: "https://m.media-amazon.com/images/I/91RQ5d-eIqL.jpg"
  }
];

app.get("/", (_req, res) => {
  res.json({
    mensaje: "API de la librería funcionando",
  });
});

app.get("/health", (_req, res) => {
  res.json({
    estado: "ok",
  });
});

app.get("/libros", (_req, res) => {
  res.json(libros);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API escuchando en el puerto ${PORT}`);
});