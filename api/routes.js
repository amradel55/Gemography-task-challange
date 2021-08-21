'use strict';

const controller = require('./controller');

module.exports = function(app) {
   app.route('/trendingRepos')
      .get(controller.getTopRepositories);

};