// Define o model Contato utilizando a biblioteca mongoose
var mongoose = require('mongoose');
 
// Cria um novo Schema com os campos que iremos utilizar no model Contato
var ConsultorSchema = new mongoose.Schema({
  nome: String,
  projeto: String,  
});

//Define o model Contato
mongoose.model('Consultor', ConsultorSchema);
