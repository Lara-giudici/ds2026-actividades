const express = require("express");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API escuchando en el puerto ${PORT}`);
});