// Todas as rotas da nossa aplicação ficarão no arquivo index.js

// INICIANDO ==============================================
// Define as bibliotecas que iremos utilizar
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Competencia = mongoose.model('Competencia');

// ROTA BUSCAR ============================================
router.get('/api/competencias', function(req, res) {
    // utilizaremos o mongoose para buscar todos os contatos no BD
    Competencia.find(function(err, competencias) {
        // Em caso de erros, envia o erro na resposta
        if (err)
            res.send(err)
        // Retorna todos os contatos encontrados no BD
        res.json(competencias); 
    });
});

// ROTA CRIAR =============================================
router.post('/api/competencias', function(req, res) {
    // Cria um contato, as informações são enviadas por uma requisição AJAX pelo Angular
    Competencia.create({
        nome : req.body.nome,
        projeto : req.body.projeto,
        telefone : req.body.telefone,
        done : false
    }, 
    function(err, competencia) {
        if (err)
            res.send(err);
        // Busca novamente todos os contatos após termos inserido um novo registro
        Competencia.find(function(err, competencias) {
            if (err)
                res.send(err)
            res.json(competencias);
        });
    });
});

// ROTA DELETAR ============================================
router.delete('/api/competencias/:competencia_id', function(req, res) {
    // Remove o contato no Model pelo parâmetro _id
    Competencia.remove({
        _id : req.params.competencia_id
    }, function(err, competencia) {
        if (err)
            res.send(err);
        // Busca novamente todos os contatos após termos removido o registro
        Competencia.find(function(err, competencias) {
            if (err)
                res.send(err)
            res.json(competencias);
        });
    });
});

// ROTA EDITAR =============================================
router.get('/api/competencias/:competencia_id', function(req, res) {
    // Busca o contato no Model pelo parâmetro id
    Competencia.findOne({
        _id : req.params.competencia_id
    }, function(err, competencia) {
        if (err)
            res.send(err);
        res.json(competencia);
    });
});

// ROTA ATUALIZAR ==========================================
router.put('/api/competencias/:competencia_id', function(req, res) {
    // Busca o contato no Model pelo parâmetro id
    var competenciaData = req.body;
    var id = req.params.competencia_id;
 
    Competencia.update( 
        {_id: id }, 
        competenciaData, 
        { upsert: true}, 
        function(err, competencia) {
            if (err) res.send(err);
            res.json(competencia);
    });    
});

// DEFININDO NOSSA ROTA PARA O ANGULARJS/FRONT-END =========
router.get('/api/competencias', function(req, res) {
    // Carrega nossa view index.html que será a única da nossa aplicação
    // O Angular irá lidar com as mudanças de páginas no front-end
    res.sendfile('./public/competencia.html');
});

module.exports = router;
