import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { useAuth } from "../context/AuthContext";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Email inválido")),

  password: z
    .string()
    .min(1, "La contraseña es obligatoria"),
});

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError(null);

    const resultado = loginSchema.safeParse({
      email,
      password,
    });

    if (!resultado.success) {
      setError(resultado.error.issues[0].message);
      return;
    }

    try {
      await login(resultado.data);

      navigate("/");
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Error desconocido"
      );
    }
  }

  return (
    <div className="container mt-5">
      <h2>Iniciar sesión</h2>

      <form
        onSubmit={handleSubmit}
        className="mt-4"
      >
        <div className="mb-3">
          <label
            htmlFor="email"
            className="form-label"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="password"
            className="form-label"
          >
            Contraseña
          </label>

          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}