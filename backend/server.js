require('dotenv').config()
const express = require('express')
const app = express()
var expressWs = require('express-ws')(app);
const bodyParser = require('body-parser');


// const server = require('http').createServer(app);
// const io = require('socket.io')(server  , {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
//   }
// });



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

//Routes
const auth = require('./routes/auth/auth')
const house = require('./routes/house/house')
const room = require('./routes/room/room')
// const device = require('./routes/device/device')
// const dashboard = require('./routes/dashboard/dashboard')


//middleware
const authorize = require('./middleware/auth');

//Routes API urls
app.use('/api/auth', auth);
// app.use('/api/dashboard', authorize(), dashboard);
app.use('/api/house', authorize(), house);
app.use('/api/room', authorize(), room);
// app.use('/api/device',  authorize(), device);

// expressWs.getWss().on('connection', function(ws) {
//   // console.log(ws);
//   console.log('connection open');
// });

// expressWs.onclose = function(event) {
//   console.log("WebSocket is closed now.");
// }

app.ws('/connection', function(ws, req) {
  console.log("New connected", ws._socket.remoteAddress);
  // ws.broadcast("connect nasad hwahahha");

});


const port =  process.env.PORT || 5000
app.listen(port, function() {
  console.log(`Running at port ${port}`);
})

// io.on('connection', (socket) => {
//   console.log("Naay Client");
  
//   // io.emit('connection', null);
//   socket.on('event', data => { /* … */
//     io.emit('event', "hi hello");
//   });
//   socket.on('disconnect', () => { /* … */ });
// });


// app.listen(port, function() {
//   console.log(`Running at port ${port}`);
// })