const express = require('express');
const app = express();
const io = require('socket.io')();

app.use(express.static('public'));

// set up routes
app.use(require('./routes/index'));
app.use(require('./routes/contact'));
app.use(require('./routes/users'));

const server = app.listen(3000, () => {
  console.log('app running on port 3000!');
});

io.attach(server);

io.on('connection', socket => {
  socket.join('room', () => {
    console.log('a user has connected!');
    io.emit('chat message', { for: 'everyone', message : `${socket.id} is here!`});
    var count = io.sockets.adapter.rooms['room'].length;
    participants(count);
  });
  
  
  //handle messages sent from client
  socket.on('chat message', msg => {
    io.emit('chat message', { for: 'everyone', message : msg});
  });

  var dCount = io.sockets.adapter.rooms['room'].length - 1;
  
  socket.on('disconnect', () => {
    console.log('a user was disconnected');
    io.emit('disconnect message', `${socket.id} has left the building!`);
    participantsD(dCount);
  });

  function participants(count) {
    if (count === 1) {
      io.emit('chat message', { for: 'everyone', message : `There is currently 1 member in this chat.`});
    } else {
      io.emit('chat message', { for: 'everyone', message : `There are currently ${count} members in this chat.`});
    }
  }

  function participantsD(count) {
    if (count === 1) {
      io.emit('chat message', { for: 'everyone', message : `There is now 1 member in this chat.`});
    } else {
      io.emit('chat message', { for: 'everyone', message : `There are now ${count} members in this chat.`});
    }
  }

});
