var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var trailSchema = new mongoose.Schema({
  userId: [{
    type: [String], ref: 'User'
  }],
  name: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  country: {
    type: String
  },
  unique_id: {
    type: Number
  },
  lat: {
    type: Number
  },
  lon: {
    type: Number
  },
  directions: {
    type: String
  },
  description: {
    type: String
  },
  activities: {
    type: Array
  },
  activities_name: {
    type: String
  },
  activities_id: {
    type: Number
  },
  activities_rating: {
    type: Number
  },
  activities_thumbnail: {
    type: String
  }
});

var Trail = mongoose.model('Trail', trailSchema);

module.exports = Trail;
