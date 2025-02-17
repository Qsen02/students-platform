import {Express,Request,Response} from "express";
import { userRouter } from "../controllers/user";

function routerConfig(app:Express){
    app.use("/users",userRouter);

    app.get("*",(req:Request,res:Response)=>{
        res.status(404).json({message:"Resource not found!"});
    });
}

export {
    routerConfig
}