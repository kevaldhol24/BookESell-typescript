"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const celebrate_1 = require("celebrate");
const body_parser_1 = __importDefault(require("body-parser"));
const DatabaseConfig_1 = require("./Database/DatabaseConfig");
const index_routes_1 = __importDefault(require("./Routers/index.routes"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const port = process.env.PORT || 5000;
const app = (0, express_1.default)();
//connect Database
(0, DatabaseConfig_1.connectDatabase)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// api router
app.use("/api", index_routes_1.default);
if (process.env.NODE_ENV == "production") {
    app.use(express_1.default.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, "client", "build", "index.html"));
    });
}
app.use((0, celebrate_1.errors)());
app.listen(port, () => {
    console.log("Server is running at", Number(port));
});
