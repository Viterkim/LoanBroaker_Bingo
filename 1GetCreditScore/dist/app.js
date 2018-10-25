"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var api_1 = require("./routes/api");
var app = express_1.default();
var port = 3000;
app.use('/', api_1.api);
app.listen(port, function () { return console.log("1GetCreditScore listening on " + port + "!"); });
