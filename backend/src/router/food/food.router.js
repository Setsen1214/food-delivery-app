import { Router } from "express";

import { createFood } from "../../controllers/auth/food/create.js";
import { getFoods } from "../../controllers/auth/food/get.js";
import { updateFood } from "../../controllers/auth/food/update.js";
import { deleteFood } from "../../controllers/auth/food/delete.js";

import { requireToken } from "../../middleware/require-token.js";
import { requireAdmin } from "../../middleware/require-admin.js";

const foodRouter = Router();

foodRouter.get("/", getFoods);

foodRouter.post(
    "/",
    requireToken,
    requireAdmin,
    createFood
);

foodRouter.put(
    "/:id",
    requireToken,
    requireAdmin,
    updateFood
);

foodRouter.delete(
    "/:id",
    requireToken,
    requireAdmin,
    deleteFood
);

export default foodRouter;