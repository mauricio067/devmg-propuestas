/**
 * Dependencies
 */
var app = require('express')();
var logger = require('../logger');
/**
 * Locals
 */
var db = {};
var Text = require('./model');
/**
 * Verbs
 */
app.get('/texts', function(req, res) {
    console.log('get texts');
    Text.find({}).exec()
            .then(function(texts) {
                var textsFixed = texts.map(function(text) {
                    return text.toJSON();
                });
                res
                        .status(200)
                        .set('Content-Type', 'application/json')
                        .json(textsFixed);
            }, function(err) {
                console.log('err', err);
            })
});
app.route('/texts/:id?')
        .all(function(req, res, next) {
            console.log(req.method, req.path, req.body);
            res.set('Content-Type', 'application/json');
            next();
        })
// POST
        .post(function(req, res) {
// manipulate request
            var textNueva = req.body.text;
            console.log(req.body.text);
// save to storage
            Text.create(textNueva)
                    .then(function(text) {
// response
                        res
                                .status(201)
                                .json( text.toJSON());
                    });
        })
// GET /texts
        .get(function(req, res, next) {
            var id = req.params.id;
            if (!id) {
                console.log('no param');
                return next();
            }
            Text.findById(id, function(err, text) {
                if (!text) {
                    return res
                            .status(400)
                            .send({});
                }
                res.json( text)
            });
        })
// PUT
        .put(function(req, res, next) {
            var id = req.params.id;
            var textActualizada = req.body.text;
            if (!id) {
                return next();
            }
            Text.update({_id: id}, textActualizada, function(err, text, results) {
                console.log(arguments);
// response
                if (results.ok) {
                    return res
                            .json(textActualizada);
                }
                res
                        .status(500)
                        .send(err);
            });
        })
// DELETE
        .delete(function(req, res) {
            var id = req.params.id;
            if (!id) {
                return next();
            }
            Text.remove({_id: id}, function() {
                res
                        .status(204)
                        .send();
            });
        });
module.exports = app;