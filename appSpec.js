/**
 *
 * UpperFilter
 *
 */
describe('Filter: Upper', function () {

	var upperFilter;

	beforeEach(module('app'));

	beforeEach(inject(function (_upperFilter_) {
		upperFilter = _upperFilter_;
	}));

	it('deveria deixar todas as letras maiúsculas', function () {
		expect(upperFilter('hello')).toBe('HELLO');
		expect(upperFilter('hello world')).toBe('HELLO WORLD');
	});

	it('deveria deixar as 4 primeiras letras maiúsculas', function () {
		expect(upperFilter('hello', 4)).toBe('HELLo');
	});

	it('deveria deixar as 4 últimas letras maiúsculas', function () {
		expect(upperFilter('hello', -4)).toBe('hELLO');
	});

});



/**
 *
 * UserController
 *
 */
describe("Controller: UserController", function () {
	var ctrl;
	var mockService;
	var scope;
	var log

	beforeEach(module('app', function ($provide) {
		mockService = {};
		$provide.value('UserService', mockService);
	}));

	beforeEach(inject(function ($log) {
		log = $log;

		spyOn(log, 'info');
		spyOn(log, 'error');
	}));

	describe("- com erro no serviço", function () {
		beforeEach(inject(function ($q) {
			mockService.list = function () {
				var defer = $q.defer();

				defer.reject({
					msg: "Error",
					statusCode: 500
				});

				return defer.promise;
			};
		}));

		beforeEach(inject(function ($controller) {
			ctrl = $controller('UserController');
		}));

		it('deveria não ter nenhum usuário na lista', function () {
			var hasUsers = ctrl.users.length > 0;
			expect(hasUsers).toBe(false);
		});
		it('deveria chamar log correto', function () {
			expect(log.error).toHaveBeenCalled();
			expect(log.info).not.toHaveBeenCalled();
		});
	});

	describe("- com sucesso no serviço", function () {
		beforeEach(inject(function ($q) {
			mockService.list = function () {
				var defer = $q.defer();
				var data = {
					users: [{
						id: 1,
						name: 'Ederson'
						}, {
						id: 2,
						name: 'Marcio'
						}, {
						id: 3,
						name: 'Wiliam'
						}, {
						id: 4,
						name: 'Thiago'
						}, {
						id: 5,
						name: 'Filipe'
						}]
				};

				defer.resolve(data);

				return defer.promise;
			};
		}));

		beforeEach(inject(function ($controller, $rootScope) {
			scope = $rootScope.$new();

			ctrl = $controller('UserController', {
				$scope: scope
			});

			scope.$digest();
		}));

		it('deveria ter pelo menos 1 usuário', function () {
			var hasUsers = ctrl.users.length > 0;
			expect(hasUsers).toBe(true);
		});
		it('deveria chamar log correto', function () {
			expect(log.info).toHaveBeenCalled();
			expect(log.error).not.toHaveBeenCalled();
		});
	});
});
