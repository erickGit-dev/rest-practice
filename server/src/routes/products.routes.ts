import { Router } from "express";
import { authToken } from "../middlewares/auth.token";
import { addProducts, getProducts } from "../controllers/products.controller";
const router = Router();

router.post('/add-products', addProducts);
router.get('/get-products', getProducts);

export default router