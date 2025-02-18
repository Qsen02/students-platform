import { Request as ExpressRequest } from "express";
import { UserAttributes } from "./users";

export interface MyRequest extends ExpressRequest {
  user?: UserAttributes;
}