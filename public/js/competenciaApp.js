// Criamos um módulo Angular chamado listaCompetencias
var listaCompetencias = angular.module('listaCompetencias', []);

function competenciaController($scope, $http) {    
 
    // Quando acessar a página, carrega todos os contatos e envia para a view($scope)
    var refresh = function (){
        $http.get('/api/competencias')
        .success(function(data) {
            $scope.competencias = data;
            $scope.formCompetencia = {};
            console.log("competencias: ", data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };
    refresh();

    // Quando clicar no botão Criar, envia informações para a API Node
    $scope.criarCompetencia = function() {
        $http.post('/api/competencias', $scope.formCompetencia)
        .success(function(data) {
            // Limpa o formulário para criação de outros contatos
            $scope.formCompetencia = {};
            $scope.competencias = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    // Ao clicar no botão Remover, deleta o contato
    $scope.deletarCompetencia = function(id) {
        $http.delete('/api/competencias/' + id)
        .success(function(data) {
            $scope.competencias = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    // Ao clicar no botão Editar, edita o contato
    $scope.editarCompetencia = function(id) {
        $http.get('/api/competencias/' + id)
        .success(function(data) {
            $scope.formCompetencia = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    // Recebe o JSON do contato para edição e atualiza
    $scope.atualizarCompetencia = function() {        
        $http.put('/api/competencias/' + $scope.formCompetencia._id, $scope.formCompetencia)
        .success( function(response){
            refresh();
        });
    };
}