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
				$http.get("/users/list").then(function (result) {
					return result.data;
				});
			}
		};
	});

	app.controller('UserController', function (UserService) {
		var self = this;

		self.users = [];

		UserService.list().then(function (result) {
			self.users = result;
		});

	});

}());
