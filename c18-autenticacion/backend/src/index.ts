import "dotenv/config";
import express from "express";
import libroRoutes from "./routes/libro.routes";
import autorRoutes from "./routes/autor.routes";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    mensaje: "API de la librería funcionando"
  });
});

app.get("/health", (_req, res) => {
  res.json({
    estado: "ok"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/libros", libroRoutes);
app.use("/api/autores", autorRoutes);

app.use(errorHandler);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API escuchando en el puerto ${PORT}`);
});