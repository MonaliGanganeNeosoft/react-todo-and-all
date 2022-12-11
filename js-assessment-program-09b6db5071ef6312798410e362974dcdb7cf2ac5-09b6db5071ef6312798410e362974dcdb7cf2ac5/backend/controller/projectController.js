import projectCollection from "../modal_Schemas/ProjectSchema.js";

export const addNewProjectFunction = (async (req,res)=>{
            let ins = new projectCollection({user_email:req.body.user_email, title:req.body.title, demo:req.body.demo, github:req.body.github, description:req.body.description})
           await ins.save((e)=>{
                if(e){
                    res.json({"err":1, "msg":"something went wrong"})
                }
                else{
                    res.json({"err":0, "msg":"succesfully added"})
                }
            })
})

export const fetchAllprojectFunction = ((req,res)=>{
    projectCollection.find({flag:1}, (e,data)=>{
        if(e){
            res.json({"err":1, "msg":"something went wrong"})
        }
        else{
            res.json({"err":0, "msg":"data sent", "data":data})
        }
    })
})

export const fetchPojectFunction = ((req,res)=>{
    projectCollection.findOne(req.query, (e,data)=>{
        if(e){
            res.json({"err":1, "msg":"something went wrong"})
        }
        else{
            res.json({"err":0, "msg":"data sent", "data":data})
        }})

})

export const deleteprojectFunction = ((req,res)=>{ 
    console.log(req.query);
    projectCollection.findOneAndUpdate(req.query,{$set:{flag:0}},{new:true} ,(err,data)=>{
        if(err){
            res.json({"err":1, "msg":"something went wrong"})
        }
        else{
            console.log(data, "line 38");
            res.json({"err":0, "msg":"data deleted"})
        }
    })
})

export const updateprojectFunction = ((req,res)=>{
    console.log(req.body, "line 44");
    projectCollection.updateOne({_id:req.body.id}, 
        {$set:{
            title:req.body.title,
            demo:req.body.demo,
            github:req.body.github,
            description:req.body.description
        }}, (err,data)=>{
        if(err){
            res.json({"err":1, "msg":"something went wrong"})
        }
        else{
            res.json({"err":0, "msg":"data Updated"})
        }
    })
})
