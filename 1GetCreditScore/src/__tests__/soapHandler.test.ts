
import { getValueFromResponse, parseXML } from '../controllers/soap/soapHandler';
import { creditScoreResponse } from '../types/CreditTypes';


const testXML = `<?xml version='1.0' encoding='UTF-8'?>
<S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
    <S:Body>
        <ns2:creditScoreResponse xmlns:ns2="http://service.web.credit.bank.org/">
            <return>5</return>
        </ns2:creditScoreResponse>
    </S:Body>
</S:Envelope>`;

const expectJSON: creditScoreResponse = {"S:Envelope":{"$":{"xmlns:S":"http://schemas.xmlsoap.org/soap/envelope/"},"S:Body":[{"ns2:creditScoreResponse":[{"$":{"xmlns:ns2":"http://service.web.credit.bank.org/"},"return":["5"]}]}]}}

test('Parse XML to JSON', async (done) => {
    expect(parseXML(testXML)).resolves.toMatchObject(expectJSON);
    done();
})

test('Extract number from JSON after parse', () => {
    expect(getValueFromResponse(expectJSON)).toBe(5);
})
