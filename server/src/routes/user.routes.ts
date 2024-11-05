import { Router } from "express";
import { signUp, logIn, deleteUser, updateUser, logOut, listUsers, } from "../controllers/users.controller";
import { authToken } from "../middlewares/auth.token";
const router = Router();

router.post('/sign-up', signUp);
router.post('/log-in', logIn);
router.post('/log-out', logOut);
router.get('/users', authToken, listUsers);
router.put('/update-user/:id', updateUser);
router.delete('/delete-user/:id', deleteUser);

export default router;