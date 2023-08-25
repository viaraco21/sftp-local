import express from "express";
import db from "./config/dbConnect.js" //Chama a conexão - importa arquivo de conexão para poder conectar
import routes from "./routes/index.js"

//cria conexão com o banco mongo
db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
   console.log('conexão com o banco feita com sucesso')
})

const app = express();

routes(app);

//é um recurso do Express que vai conseguir fazer interpretar o que está chegando via post ou via put
//e transformar aquilo em um objeto para eu poder armazenar, visualizar e manipular.
app.use(express.json())


export default app                                      