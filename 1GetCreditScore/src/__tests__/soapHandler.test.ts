import { getValueFromResponse, parseXML, getCreditScoreFromService } from '../controllers/soap/soapHandler';
import { CreditScoreResponse } from '../types/CreditTypes';
import { sendToRabbit } from '../controllers/rabbitmq/rabbitPublisher';


const testXML = `<?xml version='1.0' encoding='UTF-8'?>
<S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
    <S:Body>
        <ns2:creditScoreResponse xmlns:ns2="http://service.web.credit.bank.org/">
            <return>5</return>
        </ns2:creditScoreResponse>
    </S:Body>
</S:Envelope>`;

const expectJSON: CreditScoreResponse = {"S:Envelope":{"$":{"xmlns:S":"http://schemas.xmlsoap.org/soap/envelope/"},"S:Body":[{"ns2:creditScoreResponse":[{"$":{"xmlns:ns2":"http://service.web.credit.bank.org/"},"return":["5"]}]}]}}

test('Parse XML to JSON', async (done) => {
    expect(parseXML(testXML)).resolves.toMatchObject(expectJSON);
    done();
})

test('Extract number from JSON after parse', () => {
    expect(getValueFromResponse(expectJSON)).toBe(5);
})
