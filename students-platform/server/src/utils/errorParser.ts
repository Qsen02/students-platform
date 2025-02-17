import { Result,ValidationError } from "express-validator";

function errorParser(errors: Result<ValidationError>){
    const message=errors.array().map(el=>el.msg).join("\n");
    return message;
}

export {
    errorParser
};