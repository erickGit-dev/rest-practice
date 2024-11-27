import {
    createCart,
    getCarts,
    updateCart,
    deleteCart
} from '../controllers/cart.controller';
import Router from "express"
const router = Router();

router.post('/create-cart', createCart);
router.get('/get-carts', getCarts);
router.get('/get-carts/:id', getCarts);
router.put('/update-cart/:id', updateCart);
router.delete('/delete-cart/:id', deleteCart);

export default router;

