'use strict';

var repositories = require('../service/repositories');



var controllers = {
    getTopRepositories: function(req, res) {
        repositories.get(req, res, (err, dist) => {

            if (err) {
                res.status(500);
                res.send(err);
            }

            res.status(200)
            res.json({ data: dist, status: 'success', status_code: '200'});
      
            
        });
    }
};


module.exports = controllers;
