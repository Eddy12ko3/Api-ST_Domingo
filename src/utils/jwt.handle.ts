import {sign, verify, decode} from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "secret.02"

const generateToken = (id: string) =>{
    const jwt = sign({userId: id}, JWT_SECRET, {expiresIn: "3h"})

    return jwt
};

const verifyToken = (jwt: string) =>{
        const isOk = verify(jwt, JWT_SECRET)
        return isOk;
};

const dataToken = (jwt: string) =>{
    const data = decode(jwt, JWT_SECRET)
}

export{ generateToken, verifyToken}