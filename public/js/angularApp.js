// Criação de um módulo Angular chamado listaContatos
var listaEmpresas = angular.module('listaEmpresas', []);

function mainController($scope, $http) {    
 
    // Quando acessar a página, carrega todos os contatos e envia para a view($scope)
    var refresh = function (){
        $http.get('/api/empresas')
        .success(function(data) {
            $scope.empresas = data;
            $scope.formEmpresa = {};
            console.log("empresas: ", data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };
    refresh();

    // Quando clicar no botão Criar, envia informações para a API Node
    $scope.criarEmpresa = function() {
        $http.post('/api/empresas', $scope.formEmpresa)
        .success(function(data) {
            // Limpa o formulário para criação de outros contatos
            $scope.formEmpresa = {};
            $scope.empresas = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    // Ao clicar no botão Remover, deleta o contato
    $scope.deletarEmpresa = function(id) {
        $http.delete('/api/empresas/' + id)
        .success(function(data) {
            $scope.empresas = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    // Ao clicar no botão Editar, edita o contato
    $scope.editarEmpresa = function(id) {
        $http.get('/api/empresas/' + id)
        .success(function(data) {
            $scope.formEmpresa = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    // Recebe o JSON do contato para edição e atualiza
    $scope.atualizarEmpresa = function() {        
        $http.put('/api/empresas/' + $scope.formEmpresa._id, $scope.formEmpresa)
        .success( function(response){
            refresh();
        });
    };
}