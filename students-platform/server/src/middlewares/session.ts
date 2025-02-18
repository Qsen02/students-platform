import { NextFunction, Response } from "express";
import { verifyToken } from "../services/token";
import { MyRequest } from "../types/express";

function session(){
    return function(req:MyRequest,res:Response,next:NextFunction){
        const token=req.headers['x-authorization'];
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