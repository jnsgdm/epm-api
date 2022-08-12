const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => { 
    const authHeader = req.headers['auth'];
    if(!authHeader){
        return res.status(401).json({msg:'Acesso negado *_*'});
    }

    try{
        jwt.verify(authHeader,process.env.SECRET,(err,verifiedToken)=>{
            if(err){
                return res.status(401).json({msg:'Acesso negado *_*'});
            }else{
                next()
            }
        })
    }catch(err){
        console.log(err);
        res.status(500).json({msg:"Algo deu errado, tente de novo mais tarde O_o"});
    }
}

module.exports = verifyToken;