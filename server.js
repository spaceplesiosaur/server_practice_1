const http = require("http");
//require is another style of import - but it's not compatible with import so don't use one if you've already decided to use the other.

//it is finding a package called http, which is part of node which is what npm runs through, importing it, and assigning it to the variable http.
const url = require('url');
const server = http.createServer();

//createServer() is a helper function that creates and instance of a class.  This class extends a class called EventEmitter, which has methods on it that allow it to listen to and respond to certain event.  We do not need to explicitly extend this class in our code, it is already done for us as part of the npm install.
let messages = [
  { 'id': 1, 'user': 'brittany storoz', 'message': 'hi there!' },
  { 'id': 2, 'user': 'bob loblaw', 'message': 'check out my law blog' },
  { 'id': 3, 'user': 'lorem ipsum', 'message': 'dolor set amet' }
];

server.listen(3000, () => {
  console.log('My cat will not stop meowing at me and also the server is running on port 3000');
});

// server.on('request', (request, response) => {
//   response.writeHead(200, { 'Content-Type': 'text/plain' });
//   //writeHead is a method that writes the start line and header, together called the head, of an http message.  Since we're writing this, this is for a response.  This one is taking an argument for a status code and another for the headers.
//   response.write('I am a little teapot\n');
//   //this method writes the body part of the http message.  In this case, it's just a string, but often it's a whole file
//   response.end();
//   //the writehead and write methods can only be called once, and it needs to before end is called.  End tells the server class that the response is ready to send back to the client.
// });

const getAllMessages = (response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  messages.forEach(message => {
    response.write(message.message)
  }
);
  response.end();
}

const addMessage = (newMessage, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  messages.push(newMessage)
  response.write(`Good job, you posted ${newMessage.message}`);
  response.end();
}

server.on('request', (request, response) => {
  if (request.method === 'GET') {
    getAllMessages(response);
  }

  else if (request.method === 'POST') {
    let newMessage = { 'id': new Date() };

    request.on('data', (data) => {
      newMessage = Object.assign(newMessage, JSON.parse(data));
    });

    request.on('end', () => {
      addMessage(newMessage, response);
    });
  }
});
