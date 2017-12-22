const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const PORT = 3001;

// Create a new express server
const app = express()

app.use(function(req,res) {
  res.sendFile("index.html", {root: "../"})
});

// Create the WebSockets server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.broadcast = function broadcast(message) {
  wss.clients.forEach(function each(client) {
    console.log(client.room, message.room)
    if(client.room === message.room ){
      console.log("sending message to rooms: ", message.room);

      client.send(JSON.stringify(message));
    }
  });
};

// TODO data base
let code = {}

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

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on('close', () => console.log('Client disconnected'));
});


server.listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));
