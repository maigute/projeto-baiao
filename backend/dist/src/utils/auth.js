"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
exports.generateAuthToken = generateAuthToken;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SALT_ROUNDS = 10;
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not defined');
}
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = Number((_a = process.env.JWT_EXPIRES_IN) !== null && _a !== void 0 ? _a : 3600);
async function hashPassword(plainPassword) {
    return bcrypt_1.default.hash(plainPassword, SALT_ROUNDS);
}
async function comparePassword(plainPassword, hashedPassword) {
    return bcrypt_1.default.compare(plainPassword, hashedPassword);
}
function generateAuthToken(user) {
    const payload = {
        id: user.id,
        email: user.email,
        situationId: user.situationId,
    };
    const options = {
        expiresIn: JWT_EXPIRES_IN,
    };
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, options);
}
