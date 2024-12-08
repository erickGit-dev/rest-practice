import { Router } from "express";
import { authToken } from "../middlewares/auth.token";
import { addProducts, deleteProduct, getProducts, updateProducts } from "../controllers/products.controller";
const router = Router();

router.post('/create-products', addProducts);
router.get('/get-products', getProducts);
router.get('/get-products/:id', getProducts);
router.put('/update-products/:id', updateProducts);
router.delete('/delete-products/:id', deleteProduct);

export default router