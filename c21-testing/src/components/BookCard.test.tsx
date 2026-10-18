import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BookCard from "./BookCard";

describe("BookCard", () => {
  it("muestra el título y el autor del libro", () => {
    render(
      <MemoryRouter>
        <BookCard
          id={1}
          titulo="El Principito"
          autor={{ id: 1, nombre: "Antoine de Saint-Exupéry" }}
          imagen="principito.jpg"
        />
      </MemoryRouter>
    );

    expect(screen.getByText("El Principito")).toBeInTheDocument();
    expect(screen.getByText("Antoine de Saint-Exupéry")).toBeInTheDocument();
  });
});