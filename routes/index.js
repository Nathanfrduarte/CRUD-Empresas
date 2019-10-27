// Todas as rotas da nossa aplicação ficarão no arquivo index.js

// INICIANDO ==============================================
// Define as bibliotecas que iremos utilizar
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Empresa = mongoose.model('Empresa');

// ROTA BUSCAR ============================================
router.get('/api/empresas', function(req, res) {
    // utilizaremos o mongoose para buscar todos os contatos no BD
    Empresa.find(function(err, empresas) {
        // Em caso de erros, envia o erro na resposta
        if (err)
            res.send(err)
        // Retorna todos os contatos encontrados no BD
        res.json(empresas); 
    });
});

// ROTA CRIAR =============================================
router.post('/api/empresas', function(req, res) {
    // Cria um contato, as informações são enviadas por uma requisição AJAX pelo Angular
    Empresa.create({
        nome : req.body.nome,
        cnpj : req.body.cnpj,
        responsavel : req.body.responsavel,
        email : req.body.email,
        telefone : req.body.telefone,
        endereco : req.body.endereco,
        banco : req.body.banco,
        agencia : req.body.agencia,
        conta : req.body.conta,
        done : false
    }, 
    function(err, empresa) {
        if (err)
            res.send(err);
        // Busca novamente todos os contatos após termos inserido um novo registro
        Empresa.find(function(err, empresas) {
            if (err)
                res.send(err)
            res.json(empresas);
        });
    });
});

// ROTA DELETAR ============================================
router.delete('/api/empresas/:empresa_id', function(req, res) {
    // Remove o contato no Model pelo parâmetro _id
    Empresa.remove({
        _id : req.params.empresa_id
    }, function(err, empresa) {
        if (err)
            res.send(err);
        // Busca novamente todos os contatos após termos removido o registro
        Empresa.find(function(err, empresas) {
            if (err)
                res.send(err)
            res.json(empresas);
        });
    });
});

// ROTA EDITAR =============================================
router.get('/api/empresas/:empresa_id', function(req, res) {
    // Busca o contato no Model pelo parâmetro id
    Empresa.findOne({
        _id : req.params.empresa_id
    }, function(err, empresa) {
        if (err)
            res.send(err);
        res.json(empresa);
    });
});

// ROTA ATUALIZAR ==========================================
router.put('/api/empresas/:empresa_id', function(req, res) {
    // Busca o contato no Model pelo parâmetro id
    var empresaData = req.body;
    var id = req.params.empresa_id;
 
    Empresa.update( 
        {_id: id }, 
        empresaData, 
        { upsert: true}, 
        function(err, empresa) {
            if (err) res.send(err);
            res.json(empresa);
    });    
});

// DEFININDO NOSSA ROTA PARA O ANGULARJS/FRONT-END =========
router.get('/api/empresas', function(req, res) {
    // Carrega nossa view index.html
    // O Angular irá lidar com as mudanças de páginas no front-end
    res.sendfile('./public/index.html');
});

module.exports = router;
