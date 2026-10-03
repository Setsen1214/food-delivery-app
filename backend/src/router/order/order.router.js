import { Router } from "express";

import { createOrder } from "../../controllers/auth/order/create.js";
import { requireToken } from "../../middleware/require-token.js";

const orderRouter = Router();

orderRouter.post("/", requireToken, createOrder);

export default orderRouter;