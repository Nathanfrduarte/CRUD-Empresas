// Criação de um módulo Angular chamado listaContatos
var listaProjetos = angular.module('listaProjetos', []);

function projetoController($scope, $http) {    
 
    // Quando acessar a página, carrega todos os contatos e envia para a view($scope)
    var refresh = function (){
        $http.get('/api/projetos')
        .success(function(data) {
            $scope.projetos = data;
            $scope.formProjeto = {};
            console.log("projetos: ", data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };
    refresh();

    // Quando clicar no botão Criar, envia informações para a API Node
    $scope.criarProjeto = function() {
        $http.post('/api/projetos', $scope.formProjeto)
        .success(function(data) {
            // Limpa o formulário para criação de outros contatos
            $scope.formProjeto = {};
            $scope.projetos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    // Ao clicar no botão Remover, deleta o contato
    $scope.deletarProjeto = function(id) {
        $http.delete('/api/projetos/' + id)
        .success(function(data) {
            $scope.projetos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    // Ao clicar no botão Editar, edita o contato
    $scope.editarProjeto = function(id) {
        $http.get('/api/projetos/' + id)
        .success(function(data) {
            $scope.formProjeto = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    // Recebe o JSON do contato para edição e atualiza
    $scope.atualizarProjeto = function() {        
        $http.put('/api/projetos/' + $scope.formProjeto._id, $scope.formProjeto)
        .success( function(response){
            refresh();
        });
    };
}