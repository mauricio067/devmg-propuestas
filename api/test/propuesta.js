var request = require('supertest');
var api = require('../server.js');
var host = "http://localhost:3000";
request = request(host);
describe("recurso propuesta",function(){
	describe("POST",function(){
		it("debera crear una propuesta nueva",function(done){
			var data = {
				"nota": {
					"title": "",
					"description": "",
					"type": "",
					"body": ""
				}
			};
			request
				.post('/notas')
				.set('Accept', 'application/json')
				.send(data)
				.expect(201)
				.expect('Content-Type', /application\/json/)
				.end(function(err, res) {
				var nota;
				var body = res.body;
				console.log('body', body);
				// Nota existe
				expect(body).to.have.property('nota');
				nota = body.nota;
				// Propiedades
				// expect(nota).to.have.property('title', 'Mejorando.la #node-pro');
				// expect(nota).to.have.property('description', 'Introduccion a clase');
				// expect(nota).to.have.property('type', 'js');
				// expect(nota).to.have.property('body', 'soy el cuerpo de json');
				// expect(nota).to.have.property('id');
				done(err);
				});
		});


	})
})