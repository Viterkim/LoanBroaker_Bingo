const http = require("http");
const soap = require("soap");

const myService = {
  MyService: {
      MyPort: {
          MyFunction: function(args) {
              return {
                  name: args.name
              };
          },

          // This is how to define an asynchronous function.
          MyAsyncFunction: function(args, callback) {
              // do some work
              callback({
                  name: args.name
              });
          },

          // This is how to receive incoming headers
          HeadersAwareFunction: function(args, cb, headers) {
              return {
                  name: headers.Token
              };
          },

          // You can also inspect the original `req`
          reallyDetailedFunction: function(args, cb, headers, req) {
              console.log('SOAP `reallyDetailedFunction` request from ' + req.connection.remoteAddress);
              return {
                  name: headers.Token
              };
          }
      }
  }
};
require('../../resources/xml/RuleBase.wsdl')
let xml = require('fs').readFileSync('../../resources/xml/RuleBase.wsdl', 'utf8');
 

//http server example
let server = http.createServer(function(request,response) {
    response.end('404: Not Found: ' + request.url);
});

server.listen(8000);
soap.listen(server, '/wsdl', myService, xml);

//express server example
let app = express();
//body parser middleware are supported (optional)
app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));
app.listen(8001, function(){
    //Note: /wsdl route will be handled by soap module
    //and all other routes & middleware will continue to work
    soap.listen(app, '/wsdl', myService, xml);
});
