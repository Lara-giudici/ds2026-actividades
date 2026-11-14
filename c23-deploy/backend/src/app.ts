import "dotenv/config";
import express from "express";
import cors from "cors";
import libroRoutes from "./routes/libro.routes";
import autorRoutes from "./routes/autor.routes";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();


const corsOptions = {
  origin: [
    "http://localhost:5173",
    process.env.FRONTEND_URL ?? "http://localhost:5173"
  ]
};

app.use(cors(corsOptions));

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

app.use((_req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada"
  });
});

app.use(errorHandler);

export default app;