import mongoose from "mongoose";

//importa o Mongoose e diz que esse arquivo é um esquema, 
//para que o Mongoose possa entender que é uma coleção de documentos
const sftpSchema = new mongoose.Schema(
    {
        id: { type: String },
        usuario: { type: String, required: true },
        pass: { type: Number }
    }
);

//variável e permitir que ela seja exportada para que possamos usá-lo em outro momento, em outro arquivo
const sftp = mongoose.model('usuario', sftpSchema);

export default sftp;