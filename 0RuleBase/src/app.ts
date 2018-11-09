const fs = require('fs');
const path = require('path');
const express = require('express');
const soap = require('soap');
const bodyParser = require('body-parser');
const xml = fs.readFileSync(path.resolve(__dirname, "../resources/xml/RuleBase.wsdl"), 'utf8')
import { getBanks } from './controllers/mysql/queries';

const myService = {
    RuleBaseService: {
        RuleBasePort: {
            RuleBaseOperation: function (args: any, callback: (results: object) => void) {
                getBanks(args.rating.$value, args.loanAmount.$value, args.loanDuration.$value).then((banksArr) => {
                    console.log('Start of getBanks');
                    callback({
                        bankListJSON: JSON.stringify(banksArr)
                    });
                }).catch((err) => {
                    console.log(err);
                    callback({
                        error: JSON.stringify(err)
                    });
                });
            }
        }
    }
};

//express server example
let app = express();
//body parser middleware are supported (optional)
app.use(bodyParser.raw({ type: function () { return true; }, limit: '5mb' }));
app.listen(8001, function () {
    //Note: /wsdl route will be handled by soap module
    //and all other routes & middleware will continue to work
    soap.listen(app, '/wsdl', myService, xml);
    console.log(`Listening for SOAP request on Port 8001`);
});
