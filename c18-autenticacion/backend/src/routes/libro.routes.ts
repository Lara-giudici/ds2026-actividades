import { Router } from "express";

import {
  getAll,
  getById,
  create,
  update,
  remove
} from "../controllers/libro.controller";

import {
  libroCreateSchema,
  libroUpdateSchema,
  idParamSchema
} from "../validations/libro.validation";

import {
  validate,
  validateParams
} from "../middlewares/validate.middleware";

import {
  authenticate,
  authorize
} from "../middlewares/auth.middleware";

import { Rol } from "../generated/prisma/enums";

const router = Router();

router.get("/", getAll);

router.get(
  "/:id",
  validateParams(idParamSchema),
  getById
);

router.post(
  "/",
  authenticate,
  authorize(Rol.ADMIN),
  validate(libroCreateSchema),
  create
);

router.put(
  "/:id",
  authenticate,
  authorize(Rol.ADMIN),
  validateParams(idParamSchema),
  validate(libroUpdateSchema),
  update
);

router.delete(
  "/:id",
  authenticate,
  authorize(Rol.ADMIN),
  validateParams(idParamSchema),
  remove
);

export default router;