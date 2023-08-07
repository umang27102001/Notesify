const jwt = require('jsonwebtoken');
const secret="ikkaBikka";
const fetchUser=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Enter valid token"});
    }
    try{
    const data=jwt.verify(token,secret);
    req.user=data.user;
    next();
    }catch(e){
        res.status(400).send({error:e});
    }
}

r=module.exports=fetchUser;