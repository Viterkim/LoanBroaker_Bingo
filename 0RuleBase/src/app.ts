const myService = {
    RuleBaseService: {
        RuleBasePort: {
        RuleBaseOperation: function (args: any) {
            return {
                bankListJSON: args.rating.$value
            };
        }
      }
    }
};

const fs = require('fs');
const path = require('path');
const express = require('express');
const soap = require('soap');
const bodyParser = require('body-parser');
const xml = fs.readFileSync(path.resolve(__dirname, "../resources/xml/RuleBase.wsdl"), 'utf8')

//express server example
let app = express();
//body parser middleware are supported (optional)
app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));
app.listen(8001, function(){
    //Note: /wsdl route will be handled by soap module
    //and all other routes & middleware will continue to work
    soap.listen(app, '/wsdl', myService, xml);
});
