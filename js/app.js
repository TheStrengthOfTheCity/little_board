(function () {

    'use strict';

    var app = angular.module('little_board', [
        'restlet.sdk',
        'Services'
    ]);

    app.run(function (activityevents) {
        activityevents.configureHTTP_BASICAuthentication('a4ccb4f9-f183-4505-b178-cca604d6c678', '4e39077a-383c-407c-a538-dd2c7cda3dfc')
    });

    app.controller('Main', control);

    control.$inject = ['boardService'];

    function control(boardService) {
        var vm = angular.extend(this, {
            title: 'Welcome to the little_board',
            events: []
        });

        vm.getData = function() {
            boardService.getAllEvents().then(
                function success(data) {
                    vm.events = data;
                    console.info(data);
                },
                function failure(err) {
                    console.err(err);
                }
            );
        };
    }

})();