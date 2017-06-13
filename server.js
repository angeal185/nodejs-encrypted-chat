var file, files, io, path, port, server;

files = require('node-static');

port = process.env.PORT || 8080;

path = require('path');

file = void 0;

server = void 0;

io = void 0;

file = new files.Server(path.resolve(__dirname, 'public'));

server = require('http').createServer(function(req, res) {
  req.addListener('end', function() {
    file.serve(req, res);
  }).resume();
});

io = require('socket.io')(server);

server.listen(port, function() {
  console.log('listening on *:' + port);
});

io.on('connection', function(socket) {
  socket.on('room:join', function(req) {
    if (req) {
      socket.emit('room:joined', req);
      socket.join(req);
      socket.broadcast.to(req).emit('message:server', {
        msg: 'person_joined'
      });
      socket.current_room = req;
    } else {
      socket.emit('message:server', {
        msg: 'command_failed'
      });
    }
  });
  socket.on('room:leave', function(req) {
    if (req) {
      socket.emit('room:left');
      socket.leave(req);
      socket.broadcast.to(req).emit('message:server', {
        msg: 'person_left'
      });
      socket.current_room = void 0;
    } else {
      socket.emit('message:server', {
        msg: 'command_failed'
      });
    }
  });
  socket.on('room:count', function() {
    var clientsList;
    if (socket.current_room !== void 0) {
      clientsList = io.sockets.adapter.rooms[socket.current_room];
      socket.emit('message:server', {
        msg: 'person_count',
        payload: clientsList.length
      });
    } else {
      socket.emit('message:server', {
        msg: 'command_failed'
      });
    }
  });
  socket.on('message:send', function(req) {
    var total_msg_size;
    if (req && req.room) {
      total_msg_size = req.msg ? req.msg.length : 0 + req.nick ? req.nick.length : 0;
      if (total_msg_size <= 4096) {
        if (socket.last_message === void 0 || (new Date).getTime() - socket.last_message > 100) {
          socket.broadcast.to(req.room).emit('message:send', {
            msg: req.msg,
            nick: req.nick
          });
          socket.emit('message:send', {
            msg: req.msg,
            nick: req.nick
          });
          socket.last_message = (new Date).getTime();
        } else {

        }
      } else {
        socket.emit('message:server', {
          msg: 'command_failed'
        });
      }
    }
  });
  socket.on('disconnect', function() {
    if (socket.current_room !== void 0) {
      socket.broadcast.to(socket.current_room).emit('message:server', {
        msg: 'person_left'
      });
    }
  });
});