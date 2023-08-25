//padrão de projeto controller, ele é o intermediário entre o que vem de requisição: 
//recebe e devolve as respostas.

import sftp from "../models/Sftp.js";

//declarção dos metodos
class SftpController {
//métodos no tipo estático, não precisam instanciar essa classe.
  static listarUsuario = (req, res) => {
    sftp.find((err, sftp) => {
      res.status(200).json(sftp)
    })
  }

  static listarUsuarioPorId = (req, res) => {
    const id = req.params.id;

    sftp.findById(id, (err, sftp) => {
      if (err) {
        res.status(400).send({ message: '${err.message} -id do usuario não localizado.' })
      } else {
        res.status(200).send(sftp);
      }
    })
  }

  static cadastrarUsuario = (req, res) => {
    let sftp1 = new sftp(req.body);
//persistir os dados no banco
    sftp1.save((err) => {

      if (err) {
        res.status(500).send({ message: '${err.message} - falha ao cadastrar usuário' })
      } else {
        res.status(201).send(sftp1.toJSON())
      }
    })
  }


  static atualizarUsuario = (req, res) => {
    const id = req.params.id;

    sftp.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Usuario atualizado com sucesso' })
      } else {
        res.status(500).send({ message: '${err.message} - id errado, por favor verificar' })
      }
    })
  }

  static excluirUsuario = (req, res) => {
    const id = req.params.id;

    sftp.findByIdAndDelete (id, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Usuário removido com sucesso' })
      } else {
        res.status(500).send({ message: '${err.message} - erro ao excluir, por favor verificar' })
      }
    })
  }
}

export default SftpController

