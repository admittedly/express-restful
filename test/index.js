var demand = require("must");
var request = require("supertest");
var express = require("express");

var Restful = require("../");
var Stub = require("../lib/express-restful-stub");

describe("connect-restful", function(){
	it("must require the module", function(){
		Restful.must.exist();
	});

	it("must add index route for resource", function(done){
		var app = express();

		var handler = Stub({User : {}});

		var restful = Restful(app, handler);

		app.use(function(req, res, next){
			//Dummy middleware
			next();
		});

		restful.addResource("user", "User");

		app.use(function(err, req, res, next){
			done(err);
		});

		request(app)
		.get("/users")
		.expect(200)
		.end(function(err, res){
			if(!!err) console.error(err);
			demand(err).not.exist();
			res.body.must.be.an.array();
			done();
		});
	});
});