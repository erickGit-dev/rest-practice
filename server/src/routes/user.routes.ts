import { Router } from "express";
import { signUP, logIn, deleteUser, updateUser, logOut, listUsers, } from "../controllers/user.controller";
import { authToken } from "../middlewares/auth.token";
const router = Router();

router.post('/sign-up', signUP);
router.post('/log-in', logIn);
router.post('/log-out', logOut);
router.get('/users', authToken, listUsers);
router.put('/update-user/:id', authToken, updateUser);
router.delete('/delete-user/:id', authToken, deleteUser);

export default router;