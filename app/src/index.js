const express = require('express');
const users = require('./lib/app');
const app = express();
const log = (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
}

app.get('/users/',log, users.listartodos);
app.get('/users/:usuario',log, users.buscarusuario); ///////////////
app.post('/users/:usuario',log, users.atualizausuario);
app.put('/users/:usuario',log, users.incluiusuario);
app.delete('/users/:usuario',log, users.deletausuario);

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`Servidor escutando em ${server.address().port}`)
});