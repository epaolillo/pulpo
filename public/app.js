angular.module('miApp', [])
.controller('MainController', function($scope) {

    $scope.qr = "qr.png";

    setInterval(function() {
        // Added timestamp to qr
        $scope.$apply(function() { // Inicia el ciclo de digestión de AngularJS
            $scope.qr = `qr.png?t=${new Date().getTime()}`;
        });
    },1000);


    // Deberia haber un request a /login que retorne si esta logueado (O Falso) y guarde ese estado recordando

    

    $scope.mensaje = "¡Hola, AngularJS!";
});