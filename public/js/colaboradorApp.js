// Criação de um módulo Angular chamado listaContatos
var listaColaboradores = angular.module('listaColaboradores', []);

function colaboradorController($scope, $http) {    
 
    // Quando acessar a página, carrega todos os contatos e envia para a view($scope)
    var refresh = function (){
        $http.get('/api/colaboradores')
        .success(function(data) {
            $scope.colaboradores = data;
            $scope.formColaborador = {};
            console.log("colaboradores: ", data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };
    refresh();

    // Quando clicar no botão Criar, envia informações para a API Node
    $scope.criarColaborador = function() {
        $http.post('/api/colaboradores', $scope.formColaborador)
        .success(function(data) {
            // Limpa o formulário para criação de outros contatos
            $scope.formColaborador = {};
            $scope.colaboradores = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    // Ao clicar no botão Remover, deleta o contato
    $scope.deletarColaborador = function(id) {
        $http.delete('/api/colaboradores/' + id)
        .success(function(data) {
            $scope.colaboradores = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    // Ao clicar no botão Editar, edita o contato
    $scope.editarColaborador = function(id) {
        $http.get('/api/colaboradores/' + id)
        .success(function(data) {
            $scope.formColaborador = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    // Recebe o JSON do contato para edição e atualiza
    $scope.atualizarColaborador = function() {        
        $http.put('/api/colaboradores/' + $scope.formColaborador._id, $scope.formColaborador)
        .success( function(response){
            refresh();
        });
    };
}