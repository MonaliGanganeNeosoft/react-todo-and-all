import userCollection from '../modal_Schemas/userSchema.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
const jwtSecret="wkjnfkjnfkjnkjfns";
const saltRounds = 10

export const registerFunction = ( async (req,res)=>{
    req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
    userCollection.findOne({email:req.body.email}, (err,data)=>{
        if(err){
            res.json({"err":1, "msg":"Something went wrong in checking data"})
        }
        else if(data== null){
            let ins = new userCollection({ firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, password: req.body.password, profile: req.file.filename})
            ins.save((e) => {
                if (e) {
                    res.json({"err":1, "msg":"Something went wrong in adding data"})
                }
                else {
                    res.json({"err":0, "msg":"New User added"})
                }
            })
        }
       else{   
        res.json({"err":1,"msg":"User already exist"})
       }
    })
})

export const loginFunction = (async (req,res)=>{
    let hashbcrypt = false
    userCollection.find({}, (err, data)=>{
        if(err){
            console.log(err, "line 38")
        }
        else{
            for(let i=0; i<data.length; i++){
                if(data[i].email === req.body.email){
                    hashbcrypt = bcrypt.compareSync(req.body.password, data[i].password) 
                     if(hashbcrypt){
                         const token = encryptData(data[i]);
                         res.json({"err":0,"msg":"Login Success","token":token})
                         break;
                     } 
                 }
            }
            if(!hashbcrypt){
                res.json({"err":1, "msg":"Email or Password does not Match"})
            }
        }
    })
})

const encryptData = (data) => {
    let pay={
        ...data._doc
    }
    const token= jwt.sign(pay, jwtSecret,{expiresIn:360000})
    return token;
}