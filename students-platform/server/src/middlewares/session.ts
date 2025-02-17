import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../services/token";

function session(){
    return function(req:Request,res:Response,next:NextFunction){
        const token=req.headers['X-Authorization'];
        if(token && typeof(token)=="string"){
            try{
                const payload=verifyToken(token);
                req.user=payload;
            }catch(err){
                res.status(403).json({message:"You dont't have credentials, please login or register!"});
            }
        }
        next();
    }
}

export {
    session
}