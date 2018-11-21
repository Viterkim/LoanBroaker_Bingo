# Loanbroaker Bingo

## Typescript startup
npm i typescript -g

in visual code: ctrl+shift+b = tsc-watch

Before a normal build: tsc


## Read this!
https://medium.com/@caleblemoine/how-to-perform-soap-requests-with-node-js-4a9627070eb6

https://www.rabbitmq.com/tutorials/tutorial-two-javascript.html

We're using AMQP for rabbitmq handling. (Using workerqueues as "loadbalancers"), almost all the "pods" will be a worker. (check code above).

## Project Setup (description of filters and pipes)
### Request comes in
Lona Request -> Start of data

Get Credit Score: Read from "Credit Bureau", which is the start of the data send to the pipe.

Get Banks: Gets banks from "Rule Base" and adds it to the data, then sends it to the pipe.

Recip. List: Reads list of banks (recipients) and pipes the data to the correct translator (via a pipe)

Translators: Reads data, digests the data into something the bank components can understand.

### Data comes back from bank
Bank of data -> End of data

Normalizer: Gets data back from banks outside the system, and combines the different data into 1 object. (XML + JSON -> 1 JSON object example)

Aggregator: Takes a combination of values and returns after a condition is met(filters out bad quotes, and returns the best one).

# Documentation
## 0RuleBase
The rule base is a soap service, primarily listening to incoming calls, returning a list of banks that are of the given criterias:
- Rating
- Amount
- Loan Duration

**The following is the XML** 
```
<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:examples:rulebaseservice">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:RuleBaseOperation soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
         <rating xsi:type="xsd:integer">???</rating>
         <loanAmount xsi:type="xsd:integer">???</loanAmount>
         <loanDuration xsi:type="xsd:integer">???</loanDuration>
      </urn:RuleBaseOperation>
   </soapenv:Body>
</soapenv:Envelope>
``` 

The Rule Base returns a XML scheme, containing a JSON list of banks which were following the criteria of the prequeset XML scheme criterias.
**Example Response**
```
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://www.examples.com/wsdl/RuleBaseService.wsdl">
   <soap:Body>
      <tns:RuleBaseOperationResponse>
         <tns:bankListJSON>[{"id":1,"name":"viktobanken","minRating":0,"url":"viter.dk","maxAmount":100000,"minAmount":1000,"maxDuration":100,"minDuration":3}]</tns:bankListJSON>
      </tns:RuleBaseOperationResponse>
   </soap:Body>
</soap:Envelope>
```

## Credit Score


## Contibutors
- **Christopher Rosendorf**
- **Christian Engelberth Olsen**
- **Viktor Kim Christiansen**
- **William Pfaffe**
- **Zaeem Shafiq**


