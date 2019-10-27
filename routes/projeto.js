// Todas as rotas da nossa aplicação ficarão no arquivo index.js

// INICIANDO ==============================================
// Define as bibliotecas que iremos utilizar
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Projeto = mongoose.model('Projeto');

// ROTA BUSCAR ============================================
router.get('/api/projetos', function(req, res) {
    // utilizaremos o mongoose para buscar todos os contatos no BD
    Projeto.find(function(err, projetos) {
        // Em caso de erros, envia o erro na resposta
        if (err)
            res.send(err)
        // Retorna todos os contatos encontrados no BD
        res.json(projetos); 
    });
});

// ROTA CRIAR =============================================
router.post('/api/projetos', function(req, res) {
    // Cria um contato, as informações são enviadas por uma requisição AJAX pelo Angular
    Projeto.create({
        nome : req.body.nome,
        gerente : req.body.gerente,
        escritorio : req.body.escritorio,
        caracteristica : req.body.caracteristica,
        done : false
    }, 
    function(err, projeto) {
        if (err)
            res.send(err);
        // Busca novamente todos os contatos após termos inserido um novo registro
        Projeto.find(function(err, projetos) {
            if (err)
                res.send(err)
            res.json(projetos);
        });
    });
});

// ROTA DELETAR ============================================
router.delete('/api/projetos/:projeto_id', function(req, res) {
    // Remove o contato no Model pelo parâmetro _id
    Projeto.remove({
        _id : req.params.projeto_id
    }, function(err, projeto) {
        if (err)
            res.send(err);
        // Busca novamente todos os contatos após termos removido o registro
        Projeto.find(function(err, projetos) {
            if (err)
                res.send(err)
            res.json(projetos);
        });
    });
});

// ROTA EDITAR =============================================
router.get('/api/projetos/:projeto_id', function(req, res) {
    // Busca o contato no Model pelo parâmetro id
    Projeto.findOne({
        _id : req.params.projeto_id
    }, function(err, projeto) {
        if (err)
            res.send(err);
        res.json(projeto);
    });
});

// ROTA ATUALIZAR ==========================================
router.put('/api/projetos/:projeto_id', function(req, res) {
    // Busca o contato no Model pelo parâmetro id
    var projetoData = req.body;
    var id = req.params.projeto_id;
 
    Projeto.update( 
        {_id: id }, 
        projetoData, 
        { upsert: true}, 
        function(err, projeto) {
            if (err) res.send(err);
            res.json(projeto);
    });    
});

// DEFININDO NOSSA ROTA PARA O ANGULARJS/FRONT-END =========
router.get('/api/projetos', function(req, res) {
    // Carrega nossa view index.html
    // O Angular irá lidar com as mudanças de páginas no front-end
    res.sendfile('./public/projeto.html');
});

module.exports = router;
