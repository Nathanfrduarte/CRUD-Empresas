// Define o model Competencia utilizando a biblioteca mongoose
var mongoose = require('mongoose');
 
// Cria um novo Schema com os campos que iremos utilizar no model Competencia
var CompetenciaSchema = new mongoose.Schema({
  nome: String,
  projeto: String,  
});

//Define o model Competencia
mongoose.model('Competencia', CompetenciaSchema);
