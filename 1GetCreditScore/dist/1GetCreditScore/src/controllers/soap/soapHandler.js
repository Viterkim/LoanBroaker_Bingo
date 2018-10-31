"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var xml2js = require('xml2js');
var soapRequest = require('easy-soap-request');
var REGEX_REPLACE = /({\?\?\?})/;
function isValidSSN(ssn) {
    return ssn.ssn.match(/\d{6}-\d{4}/);
}
function getValueFromResponse(response) {
    return parseInt(response["S:Envelope"]["S:Body"]["0"]["ns2:creditScoreResponse"]["0"].return["0"]);
}
function getCreditScoreFromService(ssn) {
    var _this = this;
    if (ssn === void 0) { ssn = { ssn: '858585-8585' }; }
    return new Promise(function (resolve, reject) {
        if (!isValidSSN(ssn)) {
            reject('Invalid ssn');
            return;
        }
        // example data
        var url = 'http://datdb.cphbusiness.dk:8080/CreditScoreService/CreditScoreService';
        var headers = {
            'Content-Type': 'text/xml;charset=UTF-8'
        };
        var xml = fs_1.default.readFileSync('./resources/xml/CreditScoreService.xml', 'utf-8').replace(REGEX_REPLACE, ssn.ssn);
        // usage of module
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var response, body, statusCode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, soapRequest(url, headers, xml)];
                    case 1:
                        response = (_a.sent()).response;
                        body = response.body, statusCode = response.statusCode;
                        if (statusCode !== 200) {
                            reject("Server returned status code: " + statusCode);
                            return [2 /*return*/];
                        }
                        xml2js.parseString(body, function (err, result) {
                            if (err) {
                                reject(err);
                            }
                            resolve({
                                creditScore: getValueFromResponse(result),
                                ssn: ssn.ssn
                            });
                        });
                        return [2 /*return*/];
                }
            });
        }); })();
    });
}
exports.getCreditScoreFromService = getCreditScoreFromService;
