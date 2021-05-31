const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const socket = require('socket.io');
const http = require('http');

const server = http.createServer(app);
const io = socket(server);

nunjucks.configure('views', {
    express:app,
})
app.set('view engine', 'html');
app.use(express.static('./node_modules/socket.io/client-dist'));

app.get('/',(req,res)=>{
    res.render('index.html');
})

io.sockets.on('connection', (socket)=>{
    socket.on('send', (data)=>{console.log(data)
        socket.broadcast.emit('call', data.msg);
    })
})

server.listen(3000,()=>{
    console.log(`server start port: 3000`);
})
