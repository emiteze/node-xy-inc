'use strict';
var mongoose = require('mongoose'),
    Point    = mongoose.model('Point');

exports.list_all_points = function(req, res) {
  Point.find({}, function(err, point) {
    if (err) res.send(err);
    res.json(point);
  });
};

exports.create_point = function(req, res) {
  var new_point = new Point(req.body);
  new_point.save(function(err, point) {
    if (err) res.send(err);
    res.json(point);
  });
};

exports.get_point_by_id = function(req, res) {
  Point.findById(req.params.pointId, function(err, point) {
    if (err) res.send(err);
    if (point) res.json(point); else res.json({ message: 'Point not found' });
  });
};

exports.get_nearby_points = function(req, res) {
  var referencepointx = req.query.coordx;
  var referencepointy = req.query.coordy;
  var maxDistance = req.query.maxDistance;
  var nearbyList = []
  Point.find({}, function(err, points) {
    if (err) res.send(err);
    points.forEach(function(point) {
        if(isNearby(referencepointx, referencepointy, point.coordx, point.coordy, maxDistance)){
          nearbyList.push(point);
        }
    });
    res.json(nearbyList);
  });
};

function isNearby(referencepointx, referencepointy, pointx, pointy, maxDistance){
  if(Math.sqrt(Math.pow((referencepointx - pointx), 2) + Math.pow((referencepointy - pointy), 2)) < maxDistance) return true;
  else return false;
}

exports.update_point = function(req, res) {
  Point.findOneAndUpdate({_id: req.params.pointId}, req.body, {new: true}, function(err, point) {
    if (err) res.send(err);
    res.json(point);
  });
};

exports.delete_point = function(req, res) {
  Point.remove({
    _id: req.params.pointId
  }, function(err, point) {
    if (err) res.send(err);
    res.json({ message: 'Point successfully deleted' });
  });
};
