import QnACollection from "../modal_Schemas/QnASchema.js";

export const addquestionFunction = (async (req,res)=>{
    let ins = new QnACollection({email:req.body.email, project_id:req.body.project_id ,question:req.body.question})
   await ins.save((e)=>{
        if(e){
            res.json({"err":1, "msg":"something went wrong"})
           console.log(e);
        }
        else{
            res.json({"err":0, "msg":"succesfully added"})
        }
    })
})

export const fetchquestionFunction = ((req,res)=>{
    QnACollection.find({project_id:req.query._id}, (e,data)=>{
         if(e){
            res.json({"err":1, "msg":"something went wrong"})
        }
        else{
            res.json({"err":0, "msg":"data fetched", "data":data})
        }
    })
})

export const addanswerFunction = ((req,res)=>{
    QnACollection.findOneAndUpdate({_id:req.body.id}, {$set:{answer:req.body.data}},{new:true}, (err,data)=>{
        if(err){
            res.json({"err":1, "msg":"something went wrong"})
        }
        else{
            res.json({"err":0, "msg":"Succesfully answer added","data":data})
        }
    })
})

