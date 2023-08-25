//local onde serão concentrados todas as rotas
import express from "express"
import sftp from "./sftpRouters.js"

//criando as rotas
const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({mensagem: "Bem vindo ao SFTP-LOCAL"})
  }) 
  app.use(
    express.json(),
    sftp
  )
 
  }
export default routes

