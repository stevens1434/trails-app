var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Trail = require('../models/trail');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("trail route");
});

router.post('/', function(req, res, next) {
  console.log("trail post route / ")
  let items = req.body.data;
  console.log(items);
})

module.exports = router;
