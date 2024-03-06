import { Router } from "express";
import { getUser, insertUser} from "../controllers/user.controller";
const router = Router();

router.get('/Users', getUser);
router.post('/Login', insertUser)
export default router;