import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "./app";

describe("GET /health", () => {
  it("responde con estado 200 y confirma que la API funciona", async () => {
    const respuesta = await request(app).get("/health");

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toEqual({
      estado: "ok"
    });
  });
});