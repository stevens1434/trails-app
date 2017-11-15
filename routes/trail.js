var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Trail = require('../models/trail');
const trailKey = process.env.Trail_Key;

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("trail route");
  res.send(trailKey);
});

router.get('/key', function(req, res, next) {
  console.log('trail key in backend...');
  res.send(trailKey);
})

router.post('/', function(req, res, next) {
  // headers: { Accept: application/json }
  console.log("trail post route / ")
  let items = req.body.data;
  console.log("items in route: ", items);
    Trail.create(items, function(err, item) {
      if(err) console.log("err: ", err);
      else console.log("item");
    })
})



module.exports = router;
