// Define o model Contato utilizando a biblioteca mongoose
var mongoose = require('mongoose');
 
// Cria um novo Schema com os campos que iremos utilizar no model Contato
var EmpresaSchema = new mongoose.Schema({
  nome: String,
  cnpj: String,
  responsavel: String,
  email: String,
  telefone: String,
  endereco: String,
  banco: String,
  conta: String,
  agencia: String
});

//Define o model Contato
mongoose.model('Empresa', EmpresaSchema);