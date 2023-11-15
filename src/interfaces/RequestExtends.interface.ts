import { JwtPayload } from "jsonwebtoken";

export interface RequestExt extends Request{
    user?: string | JwtPayload;
}
