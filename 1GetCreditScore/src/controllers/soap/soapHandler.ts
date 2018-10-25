import fs from 'fs';
const soapRequest = require('easy-soap-request');
const regexReplace = /({\?\?\?})/;

export function soap(){
  // example data
  const url = 'http://datdb.cphbusiness.dk:8080/CreditScoreService/CreditScoreService';
  const headers = {
    'Content-Type': 'text/xml;charset=UTF-8'
  };
  const newValue = '858585-8585';
  const xml = fs.readFileSync('./xml/CreditScoreService.xml', 'utf-8').replace(regexReplace, newValue);

  // usage of module
  (async () => {
    const { response } = await soapRequest(url, headers, xml);
    const { body, statusCode } = response;
    console.log(body);
    console.log(statusCode);
  })();
}
