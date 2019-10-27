// Define o model Contato utilizando a biblioteca mongoose
var mongoose = require('mongoose');
 
// Cria um novo Schema com os campos que iremos utilizar no model Contato
var ProjetoSchema = new mongoose.Schema({
  nome: String,
  gerente: String,
  escritorio: String,
  caracteristica: String,
});

//Define o model Contato
mongoose.model('Projeto', ProjetoSchema);