import { Router } from 'express';
import { createOrder, deleteOrder, getOrders, updateOrder } from '../controllers/order.controller';

const router = Router();

router.post('/create-order', createOrder);
router.get('/get-orders', getOrders);
router.get('/get-orders/:id', getOrders);
router.put('/update-order/:id', updateOrder);
router.delete('/delete-order/:id', deleteOrder);

export default router;
