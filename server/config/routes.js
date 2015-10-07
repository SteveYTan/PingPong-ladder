var controller = require('../controller/controllers.js');

module.exports = function(app){


	app.get('/', function(request, response){

		controller.show(request, response);
	})

	app.get('/:id', function(request, response){
		controller.info(request,response);
	
	})
	app.get('/doubles/landing', function(request, response){
		controller.showD(request,response);
	})

	app.post('/add', function(request, response){

		controller.add(request, response);
	})

	app.post('/report', function(request, response){
	
		controller.report(request, response);

	})
	app.post('/reportd', function(request, response){
	
		controller.reportd(request, response);

	})
	app.get('/:id/destroy', function(request, response){
		controller.confirm(request, response);
	})
	app.post('/die/die', function(request, response){
		controller.kill(request, response);
	})
	app.post('/search/user', function(request, response){
		controller.search(request, response);
	})

}