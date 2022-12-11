import express from 'express';
import  cors from'cors';
import userRouter from './routes/userRouter.js'
import projectRouter from './routes/projectRouter.js'
import qnaRouter from './routes/qnaRouter.js'
import { connectdb } from './configDb/connection.js';

const PORT = 5000
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use("../froentend/public/images/", express.static("public"));

app.use("/user",userRouter)
app.use("/project",projectRouter)
app.use("/QNA",qnaRouter)

connectdb();

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`working on ${PORT}`)
}) 