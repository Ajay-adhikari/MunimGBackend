import { Router } from "express";
import User from "../controllers/UserController";
import { validate, validateSchema } from "../middleware/Validation";
import { AddUserScehma, LoginSchema } from "../Schemas/UserSchema";

const router = Router();

router.post('/add', validateSchema(AddUserScehma), User.register);
router.post('/login', validateSchema(LoginSchema), User.login);
router.get('/details', validate, User.getUserDetails);

export default router;
