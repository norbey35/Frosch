angular.module('Frosch')
    .controller('SeleccionJugadoresCtrl',
    function ($scope, $state, config, audio, hotkeys) {

        var monedaAudio = new audio('assets/sounds/moneda.ogg');

        hotkeys.bindTo($scope)
            .add({
                combo: config.configuracion.keymap.enter,
                callback: function () {
                    if ($scope.creditosExactos()) {
                        config.setNumJugadores($scope.numJugadores());
                        $state.go('jugar.chico.principal');
                    }
                }
            });

        if (!config.puntos)
            $state.go('jugar.chico.seleccionPuntos');

        $scope.config = config;

        $scope.agregarCredito = function () {
            $scope.creditos++;

            monedaAudio.play();

        };

        $scope.numJugadores = function () {
            return $scope.creditos / config.creditosPorJugador();
        };

        $scope.creditosJugador = function (numJugador) {
            return $scope.numJugadores() - (numJugador - 1);
        };

        $scope.creditosExactos = function () {
            return $scope.creditos && Math.round($scope.numJugadores()) === $scope.numJugadores() && $scope.numJugadores() > 1;
        };

        $scope.creditosFaltantes = function () {
            if ($scope.numJugadores() == 6)
                return false;

            return config.creditosPorJugador() - ($scope.creditos % config.creditosPorJugador());
        };

        $scope.siguienteJugador = function () {
            return Math.floor($scope.numJugadores() + 1);
        };


    });