// Criamos um módulo Angular chamado listaContatos
var listaConsultor = angular.module('listaConsultor', []);

function consultorController($scope, $http) {    
 
    // Quando acessar a página, carrega todos os contatos e envia para a view($scope)
    var refresh = function (){
        $http.get('/api/consultores')
        .success(function(data) {
            $scope.consultores = data;
            $scope.formConsultor = {};
            console.log("consultores: ", data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };
    refresh();

    // Quando clicar no botão Criar, envia informações para a API Node
    $scope.criarConsultor = function() {
        $http.post('/api/consultores', $scope.formConsultor)
        .success(function(data) {
            // Limpa o formulário para criação de outros contatos
            $scope.formConsultor = {};
            $scope.consultores = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    // Ao clicar no botão Remover, deleta o contato
    $scope.deletarConsultor = function(id) {
        $http.delete('/api/consultores/' + id)
        .success(function(data) {
            $scope.consultores = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    // Ao clicar no botão Editar, edita o contato
    $scope.editarConsultor = function(id) {
        $http.get('/api/consultores/' + id)
        .success(function(data) {
            $scope.formConsultor = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    // Recebe o JSON do contato para edição e atualiza
    $scope.atualizarConsultor = function() {        
        $http.put('/api/consultores/' + $scope.formConsultor._id, $scope.formConsultor)
        .success( function(response){
            refresh();
        });
    };
}