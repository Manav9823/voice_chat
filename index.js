const express = require('express');
const app = express();
const { createServer } = require('node:http');
const intializeSocket = require('./utils/socket');
const server = createServer(app)
require('dotenv').config()

app.use(express.static(__dirname + '/views')); // html
app.use(express.static(__dirname + '/public')); // js, css, images

intializeSocket(server)

server.listen(7777, ()=>{
    console.log('App is listening at port 7777')
})
app.get('/', (req, res) => {
  res.sendFile('index.html');
});
