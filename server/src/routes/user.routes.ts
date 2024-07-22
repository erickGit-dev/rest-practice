import { Router } from "express";
import { insertUser, listUsers, authUsers, deleteUser, updateUser, logOut, } from "../controllers/user.controller";
import { authToken } from "../middlewares/auth.token";
const router = Router();

router.get('/users', authToken, listUsers);
router.post('/sign-up', insertUser);
router.post('/log-in', authUsers);
router.put('/update-user/:id', authToken, updateUser);
router.delete('/delete-user/:id', authToken, deleteUser);
router.post('/log-out', logOut);

export default router;