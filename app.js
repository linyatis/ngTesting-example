(function () {
	"use strict";

	var app = angular.module('app', []);


	app.filter('upper', function () {
		return function (data, quantity) {
			if (quantity > 0) {
				return data.substr(0, quantity).toUpperCase() + data.slice(quantity);
			} else if (quantity < 0) {
				return data.substr(0, data.length + quantity) + data.slice(quantity).toUpperCase();
			} else {
				return data.toUpperCase();
			}
		};
	});

	app.factory('UserService', function ($http) {
		return {
			list: function () {
				return $http.get("api/users.json").then(function (result) {
					return result.data;
				});
			}
		};
	});

	app.controller('UserController', function (UserService, $log) {
		var self = this;

		self.users = [];

		UserService.list().then(function (data) {
			self.users = data.users;
			$log.info('Tudo certo!');
		}, function (result) {
			$log.error('Erro');
		});
	});

}());
