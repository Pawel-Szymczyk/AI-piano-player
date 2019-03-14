const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

var key = fs.readFileSync(__dirname + '/selfsigned.key');
var cert = fs.readFileSync(__dirname + '/selfsigned.crt');
var options = {
  key: key,
  cert: cert
};


const server = https.createServer(options,app);


app.get('/', (req, res) => res.sendFile(path.join(__dirname) + '/index.html'))

app.use(express.static(path.join(__dirname, 'public')));



server.listen(port, () => console.log(`server listening on ${port}`));

