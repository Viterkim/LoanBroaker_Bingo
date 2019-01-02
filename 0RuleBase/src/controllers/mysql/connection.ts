import mysql, { Connection } from 'mysql';

let connection: Connection = mysql.createConnection({
    host: 'dbdolphin.viter.dk',
    user: 'dolphin',
    password: 'mingade',
    database: 'lonebroaker'
});


connection.connect((err: Error) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    //console.log(`connected as id ${connection.threadId}`);
});

connection.on('error', function () {
    console.log("Reconnecting");
    connection.connect();
});

export default connection;
