(function () {

    'use strict';

    // creates an angular module called little_board - bound to body through ng-app directive
    var app = angular.module('little_board', []);

    // creating controller
    app.controller('Main', control);

    // Inject the $http service. Need $http to make HTTP requests to the API
    control.$inject = ['$http'];

    // Pass any injected services to the controller constructor function
    function control($http) {

        var vm = angular.extend(this, {
            title: 'Welcome to the little_board',
            events: [],
            endpoint: ''
        });

        vm.init = function () {
            // get the endpoint from the config file
            $http.get('config.json').then(
                function success(response) {
                    vm.endpoint = response.data.endpoint;
                    console.info(response.data);
                },
                function failure(err) {
                    console.err(err);
                }
            )
        }

        vm.getData = function () {
            // Using an unauthenticated API here
            // Use $http service to send get request to API and execute different functions depending on whether it is successful or not
            $http.get(vm.endpoint + 'events/').then(
                function success(response) {
                    vm.events = response.data;
                    console.info(response);
                },
                function failure(err) {
                    console.error(err);
                }
            )
        };

        vm.init();
    }

})();