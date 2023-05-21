const express = require('express');
const users = require('./lib/app');
const app = express();

app.get('/users/:topology', users.get);
app.post('/users/:topology', users.post);
app.delete('/users/:topology', users.deleteUser);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Servidor escutando em ${server.address().port}`)
});
