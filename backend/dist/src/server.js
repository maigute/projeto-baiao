"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
});
app.use('/api', index_1.default);
async function start() {
    try {
        console.log('Connecting to database...');
        await database_1.default.authenticate();
        console.log('Database connection has been established successfully.');
        console.log('Synchronizing models with database...');
        await database_1.default.sync();
        console.log('Models synchronized successfully.');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
start();
