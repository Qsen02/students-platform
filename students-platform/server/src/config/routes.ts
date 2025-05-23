import {Express} from "express";
import { userRouter } from "../controllers/user";
import { courseRouter } from "../controllers/course";
import { lectionRouter } from "../controllers/lection";
import { assessmentRouter } from "../controllers/assessment";

function routerConfig(app:Express){
    app.use("/users",userRouter);

    app.use("/courses",courseRouter);

    app.use("/lections",lectionRouter);

    app.use("/assessments",assessmentRouter);

    app.get("*",(req,res)=>{
        res.status(404).json({message:"Resource not found!"});
        return;
    });
}

export {
    routerConfig
}