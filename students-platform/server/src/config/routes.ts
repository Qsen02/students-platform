import {Express,Request,Response} from "express";

function routerConfig(app:Express){

    app.get("*",(req:Request,res:Response)=>{
        res.status(404).json({message:"Resource not found!"});
    });
}

export {
    routerConfig
}