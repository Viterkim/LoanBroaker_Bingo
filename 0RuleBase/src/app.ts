import { soap } from 'express-soap';
import express from 'express';
import fs from 'fs';
const app = express();
const path = require("path");
 
app.use('/soap/rulebase', soap({
    services: {
        RuleBaseService: {
            RuleBase: {
                RuleBaseOperation({rating} : any, res: any) {
                    res({
                        result: "skyyyyt" + rating
                    });
                }
              }
        }
    }, 
    
    wsdl: fs.readFileSync(path.resolve(__dirname, "../resources/xml/RuleBase.wsdl"), 'utf8') // or xml (both options are valid)
}));

app.listen(8001, () => {console.log('Lytter paa 8001')})
