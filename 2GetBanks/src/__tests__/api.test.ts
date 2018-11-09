import { getRuleBaseFromService, parseXML, replaceFirst } from '../controllers/api/api';

const testXML = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://www.examples.com/wsdl/RuleBaseService.wsdl">
<soap:Body>
   <tns:RuleBaseOperationResponse>
      <tns:bankListJSON>[{"id":1,"name":"viktobanken","minRating":0,"url":"viter.dk"}]</tns:bankListJSON>
   </tns:RuleBaseOperationResponse>
</soap:Body>
</soap:Envelope>`;

test('Parse XML to JSON', (done) => {
    const expected = [{
        id: 1,
        name: "viktobanken",
        minRating: 0,
        url: "viter.dk"
    }]
    parseXML(testXML).then((bankArray) => {
        expect(bankArray).toMatchObject(expected);
        done();
    })
})

const testReplace = `<soapenv:Envelope>
<soapenv:Header/>
<soapenv:Body>
   <ser:ruleBase>
     <rating>{???}</rating>
     <loanAmount>{???}</loanAmount>
     <loanDuration>{???}</loanDuration>
   </ser:ruleBase>
</soapenv:Body>
</soapenv:Envelope>`

test('Can replace only the first instance of a string', () => {
    const replaced = replaceFirst(testReplace, `{???}`, `989`);
    expect(replaced.includes(`<rating>989<`)).toBe(true);
    expect(replaced.includes(`<loanAmount>{???}<`)).toBe(true);
})

test('Testing getting the rule base', (done) => {
    getRuleBaseFromService(400, 1000, 20, `http://localhost:8001/wsdl?wsdl`).then((bankArr) => {
        console.log(bankArr);
        expect(bankArr.length).toBe(1);
        done();
    }).catch((err) => {
        fail(err);
    })
})
