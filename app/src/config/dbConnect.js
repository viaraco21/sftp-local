import mongoose from "mongoose";

mongoose.connect("mongodb+srv://raco:261543@cluster0.3ozqyud.mongodb.net/sftp-local")

let db = mongoose.connection;

export default db;