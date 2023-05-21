const fs = require('fs');
const BINARY_FILE = "/usr/local/bin/script.sh";

const getUsersConf = async (user) => {
  let exists = ""

  return exists;
};

const postUsersConf = async (user, password) => {
  let retorno = true

  return retorno;
};

const deleteUsersConf = async (user) => {
  let retorno = true
  return retorno;
};

const get = async (req, res) => {
  const {
    query: { user }
  } = req;

  let cb = {};
  try {
    cb.exists = await getUsersConf(user);
    res.status(200);
  } catch (error) {
    cb.error = error;
    res.status(500);
  }

  res.send(cb);
};

const post = async (req, res) => {
  const {
    query: { user, password }
  } = req;
  
  if (password) {
    try {
      await postUsersConf(user, password);
      res.status(200);
    } catch (error) {
      res.status(500);
    }
  } else {
    console.log(`password não informado na querystring`);
  }

  res.send({ message: 'Usuario incluido com sucesso!' });
};

const deleteUser = async (req, res) => {
  const {
    query: { user }
  } = req;

  try {
    await deleteUsersConf(user);
    res.status(200);
  } catch (error) {
    console.log(`Erro na exclusão do usuário do - ${JSON.stringify(error)}`);
    res.status(500);
  }

  res.send({ message: 'Usuário Deletado' });
};

module.exports = { get, post, deleteUser };
