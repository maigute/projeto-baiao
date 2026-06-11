"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not defined');
}
const JWT_SECRET = process.env.JWT_SECRET;
function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ message: 'Authorization header missing' });
        return;
    }
    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !token) {
        res.status(401).json({ message: 'Invalid authorization format' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (!decoded.id) {
            res.status(401).json({ message: 'Invalid token payload' });
            return;
        }
        req.userId = decoded.id;
        next();
    }
    catch {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
}
