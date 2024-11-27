import { Router } from 'express';
import { createCategory, getCategorys, updateCategory, deleteCategory } from '../controllers/category.controller';

const router = Router();

router.post('/create-category', createCategory);
router.get('/get-categorys', getCategorys);
router.get('/get-categorys/:id', getCategorys);
router.put('/update-category/:id', updateCategory);
router.delete('/delete-category/:id', deleteCategory);

export default router;