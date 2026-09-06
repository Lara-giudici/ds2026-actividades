import { Router } from "express";

import {
  getAll,
  getById,
  create,
  update,
  remove
} from "../controllers/autor.controller";

import {
  autorCreateSchema,
  autorUpdateSchema
} from "../validations/autor.validation";

import {
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
  validate(autorCreateSchema),
  create
);

router.put(
  "/:id",
  authenticate,
  authorize(Rol.ADMIN),
  validateParams(idParamSchema),
  validate(autorUpdateSchema),
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