import ws from 'ws';
import SocketManager from './SocketManager';
//Open a WebSocket Server

//Listen for incoming requests, using a predefined ssn (It comes when opening the request).
//Whenever a new "Quote" from the Banks arrives on a predefined RabbitMQ queue, it is read.
//Lastly the data is then sent to the listening party, the WebSocket connection is then closed after X seconds of timeout.

const manager = new SocketManager();
const PORT = 9006;

const websocketServer = new ws.Server({
    port: PORT
})

websocketServer.on('connection', (socket: any) => {
    manager.addSocket(socket);
});

console.log(`Webserver Listening on ${PORT}`);
