'use strict'

const USERSCONF = "users.conf";

const fs = require('fs')

const listartodos = async (req, res) => {
  let retorno = true

  try {
    const data = fs.readFileSync(USERSCONF, 'utf8')
    return res.json(data);

  } catch (err) {

    return res.status(404).json({ error: 'Sem usuario' });
  }
}

///////////////////////////////////////////////////////

const buscarusuario = async (req, res) => {
  let usuario = req.params.usuario;
  const data = fs.writeFileSync(USERSCONF, usuario = "", 'utf8')
  try {    
     if ((usuario == codigo)){ 
        console.log("Usuário já cadastrado!");
        return res.json(data);} 

     else ((usuario != codigo)){ 
        return res.status(404).json({ error: 'Usuário não cadastrado!' });
      }
  }
}

////////////////////////////////////////////////////////

const atualizausuario = async (req, res) => {
  let usuario = req.params.usuario;
  let { password } = req.body;

  return;
};

const incluiusuario = async (req, res) => {
  let { usuario, password } = req.body;

  return;
};

const deletausuario = async (req, res) => {
  let usuario = req.params.usuario;

  return;
};


module.exports = { listartodos, buscarusuario, atualizausuario, incluiusuario, deletausuario };

/*

module.exports = {
    create: function () {
        if (!fs.existsSync(USERSCONF)) {
            grava("admin:admin:::admin");
        };
    },

    listarUsers: function () {
        try {
            const data = fs.readFileSync(USERSCONF, 'utf8')
            console.log(data)
            return data;
        } catch (err) {
            console.error(err)
            return
        }

    },

    : function (user) {
        let oUsers = listarUsers();

        oUsers.filter(u)
    },

    incluirUser: function (user, password) {
buscarUser
        buscarUser(user).then((u) => {
            console.log("Usuário já cadastrado!");
            return
        })

        let content = user + ":" + password + ":::" + user

        grava(content).then(r => {
            console.log("Usuario cadastrado com sucesso!");
            return
        })
          
    },
    alterarUser: function (user, password) {
        oUsers = buscarUser(user);
        oUsers.user = user;
        oUsers.password = password;
        oUsers.grava();

    },
    excluirUser: function (user) {
        oUsers = buscarUser(user);
        oUsers.user = user;
        oUsers.delete(); 
    }
}

function grava(content) {
    try {
        const data = fs.writeFileSync(USERSCONF, content)
    } catch (err) {
        console.error(err)
    }
}










const USERSCONF = "users.conf";
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

******const get = async (req, res) => {
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

module.exports = { listartodos,buscarusuario,atualizausuario,incluiusuario,deletausuario };

//criei um objeto chamado rotas
const rotas = {
  '/ listartodos': ($USERSCONF) 
}

const buscarusuario = async (req, res) => {
  let usuario = req.params.usuario;
  try {
    const data = fs.readFileSync(usuario, 'utf8')
    return res.json(data); 
    
    } catch (err) {
  return res.status(404).json({error: 'Usuario não encontrado'}); 
}
}

   let content = usuario + ":" + password + ":" + codigo

      grava(content).then(r => {
        console.log("Usuario cadastrado com sucesso!");
        return
      })
    }
  }

  function (usuario, password, codigo) {
      buscarusuario(usuario).then((codigo) => {
        console.log("Usuário já cadastrado!");
        return
      })
      console.log("Usuário não cadastrado!");
}

*/