import { Router } from "express";
import { insertUser, listUsers, authUsers, deleteUser, updateUser, } from "../controllers/user.controller";
import { authToken } from "../middlewares/auth.token";
const router = Router();

router.get('/users', authToken, listUsers);
router.post('/signUp', insertUser);
router.post('/logIn', authUsers);
router.put('/updateUser/:id', authToken, updateUser);
router.delete('/deleteUser/:id', authToken, deleteUser);

export default router;