// Todas as rotas da nossa aplicação ficarão no arquivo index.js

// INICIANDO ==============================================
// Define as bibliotecas que iremos utilizar
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Colaborador = mongoose.model('Colaborador');

// ROTA BUSCAR ============================================
router.get('/api/colaboradores', function(req, res) {
    // utilizaremos o mongoose para buscar todos os contatos no BD
    Colaborador.find(function(err, colaboradores) {
        // Em caso de erros, envia o erro na resposta
        if (err)
            res.send(err)
        // Retorna todos os contatos encontrados no BD
        res.json(colaboradores); 
    });
});

// ROTA CRIAR =============================================
router.post('/api/colaboradores', function(req, res) {
    // Cria um contato, as informações são enviadas por uma requisição AJAX pelo Angular
    Colaborador.create({
        nome : req.body.nome,
        email : req.body.email,
        telefone : req.body.telefone,
        cargo : req.body.cargo,
        done : false
    }, 
    function(err, colaborador) {
        if (err)
            res.send(err);
        // Busca novamente todos os contatos após termos inserido um novo registro
        Colaborador.find(function(err, colaboradores) {
            if (err)
                res.send(err)
            res.json(colaboradores);
        });
    });
});

// ROTA DELETAR ============================================
router.delete('/api/colaboradores/:colaborador_id', function(req, res) {
    // Remove o contato no Model pelo parâmetro _id
    Colaborador.remove({
        _id : req.params.colaborador_id
    }, function(err, colaborador) {
        if (err)
            res.send(err);
        // Busca novamente todos os contatos após termos removido o registro
        Colaborador.find(function(err, colaboradores) {
            if (err)
                res.send(err)
            res.json(colaboradores);
        });
    });
});

// ROTA EDITAR =============================================
router.get('/api/colaboradores/:colaborador_id', function(req, res) {
    // Busca o contato no Model pelo parâmetro id
    Colaborador.findOne({
        _id : req.params.colaborador_id
    }, function(err, colaborador) {
        if (err)
            res.send(err);
        res.json(colaborador);
    });
});

// ROTA ATUALIZAR ==========================================
router.put('/api/colaboradores/:colaborador_id', function(req, res) {
    // Busca o contato no Model pelo parâmetro id
    var colaboradorData = req.body;
    var id = req.params.colaborador_id;
 
    Colaborador.update( 
        {_id: id }, 
        colaboradorData, 
        { upsert: true}, 
        function(err, colaborador) {
            if (err) res.send(err);
            res.json(colaborador);
    });    
});

// DEFININDO NOSSA ROTA PARA O ANGULARJS/FRONT-END =========
router.get('/api/colaboradores', function(req, res) {
    // Carrega nossa view index.html
    // O Angular irá lidar com as mudanças de páginas no front-end
    res.sendfile('./public/colaborador.html');
});

module.exports = router;
