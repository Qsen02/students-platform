import { NextFunction, Request, Response } from "express";

function setCors() {
    return function(req:Request, res:Response, next:NextFunction) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, DELETE, POST");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Authorization");
        next();
    }
}

export {
    setCors
}