const express = require('express');
const route = express.Router();
const Project = require('../models/Project.js');
const verifyToken = require('../middleware/verifyToken.js');

route.post('/create',verifyToken,async(req,res)=>{
    const {
        ref,
        type:{
            B2B: B2B,
            B2C: B2C
        },
        area:{
            technology: technology,
            marketing: marketing,
            commercial: commercial
        },
        development_time,
        cost,
        gross_profit
    } = req.body;

    try{
        await Project({
            ref,
            type:{
                B2B: B2B,
                B2C: B2C
            },
            area:{
                technology: technology,
                marketing: marketing,
                commercial: commercial
            },
            development_time,
            cost,
            gross_profit
        }).save();
        return res.status(200).json({msg:"Projeto salvo com sucesso =D"});
    }catch(err){
        console.log(err);
        return res.status(500).json({msg:'Sem resposta do servidor O_o'});
    }
});

route.get('/all',verifyToken,async(req,res)=>{
    try{
        const projects = await Project.find({});
        res.status(200).json({data: projects});
    }catch(err){
        console.log(err);
        res.status(500).json({msg:'Sem resposta do servidor O_o'});
    }
});

route.patch('/update/:id',verifyToken,async(req,res)=>{
    const projectID = req.params.id;

    const {
        ref,
        type:{
            B2B: B2B,
            B2C: B2C
        },
        area:{
            technology: technology,
            marketing: marketing,
            commercial: commercial
        },
        development_time,
        cost,
        gross_profit
    } = req.body;

    try{
        const updateProject = await Project.updateOne({_id: projectID},{
            ref,
            type:{
                B2B: B2B,
                B2C: B2C
            },
            area:{
                technology: technology,
                marketing: marketing,
                commercial: commercial
            },
            development_time,
            cost,
            gross_profit
        });

        if(updateProject.acknowledged){
            if(updateProject.matchedCount === 0){
                res.status(422).json({msg:"Projeto não encontrado *_*"});
            }else{
                res.status(200).json({msg:"Dados atualizados com sucesso ;)"});
            }
        }
    }catch(err){
        console.log(err);
        res.status(500).json({msg:'Sem resposta do servidor O_o'});
    }
});

route.delete("/delete/:id",verifyToken,async(req,res)=>{
    const projectID = req.params.id;

    try{
        await Project.deleteOne({_id:projectID});
        res.status(200).json({msg:"Deletado com sucesso ;)"})
    }catch(err){
        console.log(err);
        res.status(500).json({msg:'Sem resposta do servidor O_o'});
    }
});

route.get('/:id',verifyToken,async(req,res)=>{
    const projectID = req.params.id;

    try{
        const project = await Project.findOne({_id: projectID});
        if(!project){
            res.status(422).json("Projeto não encontrado *_*")
        }else{
            res.status(200).json({data: project});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({msg:'Sem resposta do servidor O_o'});
    }
});

module.exports = route;