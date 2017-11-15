var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Trail = require('../models/trail');
const trailKey = process.env.Trail_Key;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(trailKey);
});
//pass key to front end
router.get('/key', function(req, res, next) {
  res.send(trailKey);
})
//grab data from db and send to trail.js in front end
router.post('/', function(req, res, next) {
  let items = req.body.data;
    Trail.create(items, function(err, item) {
      if(err) console.log("err: ", err);
      else console.log("item");
    })
})

module.exports = router;
