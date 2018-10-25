"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var soapHandler_1 = require("../controllers/soap/soapHandler");
var rabbitPublisher_1 = require("../controllers/rabbitmq/rabbitPublisher");
var router = express_1.Router();
router.get('/', function (req, res) {
    soapHandler_1.getCreditScoreFromService().then(function (newCreditScore) {
        rabbitPublisher_1.sendToRabbit(JSON.stringify(newCreditScore), 'CreditService').then(function (result) {
            res.json({
                message: "Your credit score for ssn: " + newCreditScore.ssn + " is: " + newCreditScore.creditScore
            });
        }).catch(function (err) {
            res.json({
                error: "" + err
            });
        });
    }).catch(function (err) {
        res.json({
            error: "" + err
        });
    });
});
//Standard Test Route
router.get('/ssn/:ssn', function (req, res) {
    var ssn = { ssn: "" + req.params['ssn'] };
    soapHandler_1.getCreditScoreFromService(ssn).then(function (newCreditScore) {
        rabbitPublisher_1.sendToRabbit(JSON.stringify(newCreditScore), 'CreditService').then(function (result) {
            res.json({
                message: "Your credit score for ssn: " + newCreditScore.ssn + " is: " + newCreditScore.creditScore
            });
        }).catch(function (err) {
            res.json({
                error: "" + err
            });
        });
    }).catch(function (err) {
        res.json({
            error: "" + err
        });
    });
});
exports.api = router;
