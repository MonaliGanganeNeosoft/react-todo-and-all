import  express from 'express';
const userRouter = express.Router();
import {loginFunction, registerFunction} from '../controller/UserController.js'
import { upload } from '../middleware/multer.js';

userRouter.route("/registerService").post(upload.single('profile'),registerFunction)
userRouter.route("/loginService").post(loginFunction)

export default userRouter