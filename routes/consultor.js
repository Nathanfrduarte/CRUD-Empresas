// Todas as rotas da nossa aplicação ficarão no arquivo index.js

// INICIANDO ==============================================
// Define as bibliotecas que iremos utilizar
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Consultor = mongoose.model('Consultor');

// ROTA BUSCAR ============================================
router.get('/api/consultores', function(req, res) {
    // utilizaremos o mongoose para buscar todos os contatos no BD
    Consultor.find(function(err, consultores) {
        // Em caso de erros, envia o erro na resposta
        if (err)
            res.send(err)
        // Retorna todos os contatos encontrados no BD
        res.json(consultores); 
    });
});

// ROTA CRIAR =============================================
router.post('/api/consultores', function(req, res) {
    // Cria um contato, as informações são enviadas por uma requisição AJAX pelo Angular
    Consultor.create({
        nome : req.body.nome,
        projeto : req.body.projeto,
        done : false
    }, 
    function(err, consultor) {
        if (err)
            res.send(err);
        // Busca novamente todos os contatos após termos inserido um novo registro
        Consultor.find(function(err, consultores) {
            if (err)
                res.send(err)
            res.json(consultores);
        });
    });
});

// ROTA DELETAR ============================================
router.delete('/api/consultores/:consultor_id', function(req, res) {
    // Remove o contato no Model pelo parâmetro _id
    Consultor.remove({
        _id : req.params.consultor_id
    }, function(err, consultor) {
        if (err)
            res.send(err);
        // Busca novamente todos os contatos após termos removido o registro
        Consultor.find(function(err, consultores) {
            if (err)
                res.send(err)
            res.json(consultores);
        });
    });
});

// ROTA EDITAR =============================================
router.get('/api/consultores/:consultor_id', function(req, res) {
    // Busca o contato no Model pelo parâmetro id
    Consultor.findOne({
        _id : req.params.consultor_id
    }, function(err, consultor) {
        if (err)
            res.send(err);
        res.json(consultor);
    });
});

// ROTA ATUALIZAR ==========================================
router.put('/api/consultores/:consultor_id', function(req, res) {
    // Busca o contato no Model pelo parâmetro id
    var consultorData = req.body;
    var id = req.params.consultor_id;
 
    Consultor.update( 
        {_id: id }, 
        consultorData, 
        { upsert: true}, 
        function(err, consultor) {
            if (err) res.send(err);
            res.json(consultor);
    });    
});

// DEFININDO NOSSA ROTA PARA O ANGULARJS/FRONT-END =========
router.get('/api/consultores', function(req, res) {
    // Carrega nossa view index.html que será a única da nossa aplicação
    // O Angular irá lidar com as mudanças de páginas no front-end
    res.sendfile('./public/consultor.html');
});

module.exports = router;
