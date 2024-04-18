import { Router } from "express";
import { showUsers, insertUser, authUsers} from "../controllers/user.controller";
import { verifyToken } from "../middlewares/users.auth";
const router = Router();

router.get('/users', showUsers);
router.post('/singin', insertUser);
router.post('/login', authUsers);

export default router;