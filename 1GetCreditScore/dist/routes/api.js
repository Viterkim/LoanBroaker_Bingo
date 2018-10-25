"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var soapHandler_1 = require("../controllers/soap/soapHandler");
var router = express_1.Router();
//Standard Test Route
router.get('/', function (req, res) {
    soapHandler_1.soap();
    res.json({
        message: 'Hello and welcome to 1GetCreditScore'
    });
});
exports.api = router;
