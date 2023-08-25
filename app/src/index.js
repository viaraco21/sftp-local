const express = require('express');
const users = require('./lib/app');
const app = express();

app.use(express.json());

app.get('/users/', users.listartodos); 
app.get('/users/:usuario', users.buscarusuario);
app.put('/users/:usuario', users.atualizausuario);
app.post('/users', users.incluiusuario);
app.delete('/users/:usuario', users.deletausuario);

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`Servidor escutando em ${server.address().port}`)
});

module.exports = app