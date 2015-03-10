
angular.module('cards-module', ['cardService-module'])
.controller('CardsController', function($scope, $rootScope, CardService) {
    $scope.cards = [];
    var controller = this;
    controller.fetchAllCards = function() {
        CardService.all().success(function(data) {
            $scope.cards = data;
        });
    };

    $rootScope.$on('newCardEvent', function(event, data) {
        CardService.postCard(data).success(function() {
            controller.fetchAllCards();
        });
    });

    controller.fetchAllCards()
})
.directive('cardsContainer', function() {
    return {
        restrict: 'E',
        templateUrl: 'cards-module/cards-container.html',
        controller: 'CardsController'
    };
});