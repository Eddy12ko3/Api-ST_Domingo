"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const jwt_handle_1 = require("../utils/jwt.handle");
const checkJwt = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader)
            return res.status(401).json({ message: 'HEADER_NOT_FOUND' });
        const [bearer, token] = authHeader.split(' ');
        if (bearer !== 'Bearer' || !token)
            return res.status(401).json({ message: 'TOKEN_INVALID' });
        const decoded = (0, jwt_handle_1.verifyToken)(token);
        if (!decoded) {
            res.status(401);
            res.json({ message: 'JWT_INVALID' });
        }
        req.body.usertoken = decoded;
        next();
    }
    catch (e) {
        res.status(400);
        res.json({ message: 'INVALID_SESSION' });
    }
};
exports.checkJwt = checkJwt;
