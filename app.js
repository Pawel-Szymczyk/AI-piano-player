const express = require('express');
const path = require('path');
const http = require('http');

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

app.get('/', (req, res) => res.sendFile(path.join(__dirname) + '/index.html'))

app.use(express.static(path.join(__dirname, 'public')));



server.listen(port, () => console.log(`server listening on ${port}`));

