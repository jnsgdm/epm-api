const express = require('express');
const route = express.Router();
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken.js');

route.post('/create',async(req,res)=>{  
    const {login, password} = req.body;

    const salt = bcrypt.genSaltSync();
    const hashedPsw = bcrypt.hashSync(password,salt);

    try{
        await User({
            login: login,
            password: hashedPsw,
            profile: {
                admin: true,
                default: false
            }
        }).save(function(err){
            if(err){
                return console.log(err);
            }
        });
        return res.status(200).json({msg:"Usuário salvo com sucesso =D"});
    }catch(err){
        console.log(err);
        res.status(500).json({msg:"Algo deu errado, tente de novo mais tarde O_o"});
    }
});

route.post('/auth',async(req,res)=>{
   const {login,password} = req.body; 
    
    if(!login){ 
        return res.status(422).json({msg:"O login é obrigatório xD"});
    }
    if(!password){
        return res.status(422).json({msg:"A senha é obrigatória xD"});
    }
    
    const verifyUser = await User.findOne({login:login});
    if(verifyUser === null ){
        return res.status(422).json({msg:"Login ou senha inválidos ^_^"});
    }
    const verifyPsw = await bcrypt.compare(password,verifyUser.password);
    if(verifyPsw === false){
        return res.status(422).json({msg:"Login ou senha inválidos ^_^"});
    }

    try{
        const token = jwt.sign({userID: verifyUser.id},process.env.SECRET);
        res.status(200).json({msg:"Logado com sucesso ;D",token: token});
    }catch(err){
        console.log(err);
        res.status(500).json({msg:"Algo deu errado, tente de novo mais tarde O_o"});
    }
});

route.get('/all',verifyToken,async(req,res)=>{
    try{
        const users = await User.find({});
        res.status(200).json({data: users});
    }catch(err){
        console.log(err);
        res.status(500).json({msg:'Sem resposta do servidor O_o'});
    }
});

route.patch('/update/:id',verifyToken,async(req,res)=>{
    const userID = req.params.id;

    const {
        login,
        password,
        profile: {
            admin: adm,
            default: df
        }
    } = req.body;

    const salt = bcrypt.genSaltSync();
    const hashedPsw = bcrypt.hashSync(password,salt);
    console.log(hashedPsw);
    try{
        const updateUser = await User.updateOne({_id: userID},{
            login: login,
            password: hashedPsw,
            profile:{
                admin: adm,
                default: df
            }
        });

        if(updateUser.acknowledged){
            if(updateUser.matchedCount === 0){
                res.status(422).json({msg:"Usuário não encontrado *_*"});
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
    const userID = req.params.id;

    try{
        await User.deleteOne({_id:userID});
        res.status(200).json({msg:"Deletado com sucesso ;)"})
    }catch(err){
        console.log(err);
        res.status(500).json({msg:'Sem resposta do servidor O_o'});
    }
});

module.exports = route;