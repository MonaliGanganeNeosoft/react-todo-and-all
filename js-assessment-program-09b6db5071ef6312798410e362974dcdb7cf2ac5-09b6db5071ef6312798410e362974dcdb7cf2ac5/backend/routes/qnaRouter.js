import  express from 'express';
const qnaRouter = express.Router();
import {addquestionFunction, fetchquestionFunction, addanswerFunction } from '../controller/qnaController.js';


qnaRouter.route("/addnewquestionService").post(addquestionFunction)
qnaRouter.route("/fetchquestionService").get(fetchquestionFunction)
qnaRouter.route("/addnewanswerService").post(addanswerFunction)

export default qnaRouter