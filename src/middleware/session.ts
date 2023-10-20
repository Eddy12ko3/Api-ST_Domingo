import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.handle";
import { JwtPayload } from "jsonwebtoken";

interface RequestExt extends Request{
    user?: string | JwtPayload;
}
const checkJwt = (req: RequestExt, res: Response, next: NextFunction) =>{
    try{
        const jwtByUser = req.headers.authorization || '';
        const jwt = jwtByUser.split(" ").pop();
        if(!jwt) return res.status(401).json({ message: "TOKEN_INVALID"})
        
        const decode = verifyToken(jwt);

        if(!decode) {
            res.status(401);
            res.send("JWT_INVALID")
        }
        
        req.body.usertoken = decode;
    }catch(e){
        res.status(400);
        res.send("INVALID_SESSION")
    }

}

export {checkJwt}