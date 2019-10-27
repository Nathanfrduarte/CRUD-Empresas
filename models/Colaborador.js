// Define o model Contato utilizando a biblioteca mongoose
var mongoose = require('mongoose');
 
// Cria um novo Schema com os campos que iremos utilizar no model Contato
var ColaboradorSchema = new mongoose.Schema({
  nome: String,
  email: String,
  telefone: String,
  cargo: String,
});

//Define o model Contato
mongoose.model('Colaborador', ColaboradorSchema);