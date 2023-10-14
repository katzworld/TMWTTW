const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const data = require('./current.json');

app.get('/',(req,res) => {
        res.send("welcome to the world")
});

app.get('/faucet/:id', (req, res) => {
  let id = req.params.id;
  response = data.find((item) => item.id == id);
  return res.json(response);
});


const server = app.listen(port, () => console.log(`app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
