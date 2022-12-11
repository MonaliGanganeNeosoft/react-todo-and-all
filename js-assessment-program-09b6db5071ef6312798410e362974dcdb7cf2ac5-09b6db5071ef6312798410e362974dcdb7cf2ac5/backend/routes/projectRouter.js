import  express from 'express';
const projectRouter = express.Router();
import { addNewProjectFunction, fetchAllprojectFunction, deleteprojectFunction, updateprojectFunction,fetchPojectFunction} from '../controller/projectController.js';

projectRouter.route("/addNewProjectService").post(addNewProjectFunction)
projectRouter.route("/fetchprojectService").get(fetchAllprojectFunction)
projectRouter.route("/fetchPojectService").get(fetchPojectFunction)
projectRouter.route("/deleteprojectService").delete(deleteprojectFunction)
projectRouter.route("/updateprojectService").post(updateprojectFunction)

export default projectRouter