import { parseXML } from '../controllers/api/api';

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
