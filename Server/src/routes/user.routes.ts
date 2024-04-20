import { Router } from "express";
import { showUsers, insertUser, authUsers, updateUser } from "../controllers/user.controller";
import { authToken } from "../middlewares/auth.token";
const router = Router();

router.get('/users', showUsers);
router.post('/singUp', insertUser);
router.post('/singIn', authUsers);
router.put('/updateUser/:id', updateUser);

export default router;