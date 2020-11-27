// https://docs.pagar.me/page/guias-pagarme

// Configurações do node

// INICIANDO ==========================================
var express  = require('express');
// cria nossa aplicação Express
var app = express();
// mongoose for mongodb
var mongoose = require('mongoose');
// solicitações para log no console (express4)
var logger = require('morgan');
// puxar informações por POST HTML (express4)
var bodyParser = require('body-parser');
// simular DELETE e PUT (express4)
var methodOverride = require('method-override');
 
 
// MONGODB ============================================
// conectando ao mongodb no localhost, criando o banco de dados contato
//mongoose.connect('mongodb://localhost/contato', { useNewUrlParser: true });
// mongodb://<dbuser>:<dbpassword>@ds121834.mlab.com:21834/projetowebd
mongoose.connect('mongodb://userprojetoweb:webd123@ds121834.mlab.com:21834/projetowebd', { useNewUrlParser: true });
// Requisição ao arquivo que cria nosso model Contato
require('./models/Empresa');
require('./models/Projeto');
require('./models/Colaborador');
require('./models/Competencia');
require('./models/Consultor');

// DEFININDO A APLICAÇÃO ==============================
// definindo local de arquivos públicos
app.use(express.static(__dirname + '/public'));
// logando todas as requisições no console
app.use(logger('dev'));
// parse application/x-www-form-urlencoded                                    
app.use(bodyParser.urlencoded({'extended':'true'}));
// parse application/json          
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

// ROTAS ===============================================
// Incluindo nossas rotas definidas no arquivo routes/index.js
var index = require('./routes/index');
var projetos = require('./routes/projeto');
var colaboradores = require('./routes/colaborador');
var competencias = require('./routes/competencia');
var consultores = require('./routes/consultor');

// Rotas na aplicação
app.use('/', index);
app.use('/', projetos);
app.use('/', colaboradores);
app.use('/', competencias);
app.use('/', consultores);

// LISTEN (iniciando nossa aplicação em node) ==========
// Define a porta 8080 onde será executada nossa aplicação local ou a porta do Heroku caso hospedado
var porta = process.env.PORT || 8080;
// Start the server
app.listen(porta);
