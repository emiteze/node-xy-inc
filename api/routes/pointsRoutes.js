'use strict';
module.exports = function(app){

  var pointsAPI = require('../controllers/pointsController');

  app.route('/points')
     .get(pointsAPI.list_all_points)
     .post(pointsAPI.create_point);

  app.route('/points/:pointId')
     .get(pointsAPI.get_point_by_id)
     .put(pointsAPI.update_point)
     .delete(pointsAPI.delete_point);

  app.route('/nearbypoints')
     .get(pointsAPI.get_nearby_points);

};
