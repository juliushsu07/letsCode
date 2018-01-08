const express = require('express');
const helmet = require('helmet');
const expressEnforcesSSL = require('express-enforces-ssl');
const PORT = process.env.PORT;
const http = require('http');
const WebSocket = require('ws').Server;

const app = express();

// Initialize an express app with some security defaults
app
  .use(https)
  .use(helmet());

// Create the WebSockets server
const server = http.createServer(app);
const wss = new WebSocket({ server });

let code = {}

wss.broadcast = function broadcast(message) {
  wss.clients.forEach(function each(client) {
    console.log(client.room, message.room)
    if(client.room === message.room ){
      console.log("sending message to rooms: ", message.room);

      client.send(JSON.stringify(message));
    }
  });
};

wss.on('connection', (client) => {
  console.log('Client connected');

  client.on('message', (message) => {
    incomingMessage = JSON.parse(message);
    console.log(incomingMessage);
    // client.room = incomingMessage.room
    switch(incomingMessage.type) {
      case "initialMsg":
        // set client's room on connection
        client.room = incomingMessage.room
        if(code[incomingMessage.room]) {
          client.send(JSON.stringify({type: "updateCode",
                                      room: incomingMessage.room,
                                      code: code[incomingMessage.room]}))
        } else {
          code[incomingMessage.room] = "";
        }
        console.log("new Client room:", client.room);
      break;

      case "updateCode":
        console.log("inSERVER UPDATE CASE:" ,incomingMessage);

        console.log("11:",client.code, incomingMessage.code )
        code[incomingMessage.room] = incomingMessage.code;
        console.log(client.code);
        wss.broadcast(incomingMessage);
      break;
    }
  });

  client.on('close', () => console.log('Client disconnected'));
});

// Application-specific routes
// Add your own routes here!
// app.get('/example-route', function (req, res, next) {
//   res.json({ message:'Hello World!' });
// });

// Serve static assets built by create-react-app
app.use(express.static('build'));

// If no explicit matches were found, serve index.html
app.get('*', function(req, res){
  res.sendFile(__dirname + '/build/index.html');
});

app
  .use(notfound)
  .use(errors);

function https(req, res, next) {
  if (process.env.NODE_ENV === 'production') {
    const proto = req.headers['x-forwarded-proto'];
    if (proto === 'https' || proto === undefined) {
      return next();
    }
    return res.redirect(301, `https://${req.get('Host')}${req.originalUrl}`);
  } else {
    return next();
  }
}

function notfound(req, res, next) {
  res.status(404).send('Not Found');
}

function errors(err, req, res, next) {
  console.log(err);
  res.status(500).send('something went wrong');
}

// app.listen(PORT, () => console.log(`Listening on ${PORT}`));
server.listen(PORT, () => console.log(`Listening on ${PORT}`));
