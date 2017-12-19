'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PointSchema = new Schema({
  name: {
    type: String,
    required: 'Point name must be informed'
  },
  coordx: {
    type: Number,
    required: 'X coordinate can not be negative'
  },
  coordy: {
    type: Number,
    required: 'Y coordinate can not be negative'
  }
});

module.exports = mongoose.model('Point', PointSchema);
