"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const contacts_routes_1 = __importDefault(require("../api/v1/routes/contacts.routes"));
const app = express_1.default();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(morgan_1.default('dev'));
app.use('/api/v1/contacts', contacts_routes_1.default);
app.get('/', (req, res) => {
    res.json({ message: "Hello World!" });
});
app.listen(port, () => {
    console.log(`Listening on Port: ${port}`);
});
exports.default = app;
