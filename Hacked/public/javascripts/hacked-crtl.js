/**
 * Created by Mikolaj Kania on 09.05.2016.
 */

var hackedApp = angular.module('hackedApp', []);

hackedApp.controller('hackedCtrl', function($scope, $http){
    $scope.result = 'Here will be result';

    $scope.getQuot = function(author){
        $http.get('/genQuot/' + author)
            .success(function(quot) {
                $scope.result = quot;
                $scope.show = 'true';

                $http.get('/getImage?' +
                    'url=https://upload.wikimedia.org/wikipedia/commons/0/0b/Paulo_Coelho_nrkbeta.jpg&' +
                    'author=coelho')
                    .success(function (image) {
                        $scope.image = image;
                    })
            })
            .error(function () {
                $scope.result = 'He is not so smart.'
            });
    };

});

hackedApp.directive('image', function() {
    return {
        template: '<div ng-if="show">' +
        '<img ng-src="{{image}}"/>' +
        '</div>'
    };
});