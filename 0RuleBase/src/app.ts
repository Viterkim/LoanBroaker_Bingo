const fs = require('fs');
const path = require('path');
const express = require('express');
const soap = require('soap');
const bodyParser = require('body-parser');
const xml = fs.readFileSync(path.resolve(__dirname, "../resources/xml/RuleBase.wsdl"), 'utf8')
import { getBanksFromRating } from './controllers/mysql/queries';


// Async does NOT work! Does not wait with promises, fix!!!
const myService = {
    RuleBaseService: {
        RuleBasePort: {
        RuleBaseOperation: function (args: any, callback: (results: object) => void) {
            getBanksFromRating(args.rating.$value).then((banksArr) => {
                console.log('Start of getBanks');
                callback({
                    bankListJSON: JSON.stringify(banksArr)
                });
                return;
            }).catch((err) => {
                callback({
                    error: JSON.stringify(err)
                });
                return;
            });
        }
      }
    }
};

//express server example
let app = express();
//body parser middleware are supported (optional)
app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));
app.listen(8001, function(){
    //Note: /wsdl route will be handled by soap module
    //and all other routes & middleware will continue to work
    soap.listen(app, '/wsdl', myService, xml);
});
