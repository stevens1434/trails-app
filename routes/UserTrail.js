var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Trail = require('../models/trail');
var path = require('path');
const url = require('url');
var fetch = require("isomorphic-fetch");
const brewKey = process.env.Brew_Key;

//delete from db -- from /UserTrails parent
router.put('/', function(req, res, next){
    let id = req.body.data._id
    Trail.findByIdAndRemove({_id: id},
       function(err, item){
        if(err) res.json(err);
        else res.end();
    });
});

router.post('/getbrews', function(req, res, next) {
  let data = req.body.data
  let lat = data[0].lat;
  let lon = data[0].lon;
  fetch('http://api.brewerydb.com/v2/search/geo/point?lat='+lat+'&lng='+lon+'&key='+brewKey)
    .then(response => response.json())
    .then(response =>
    res.send(response))

})

//get specific trail -- from /trails/:user/:trailid
router.get('/id/:id', function(req, res, next){
  let listingId = req.params.id
    Trail.find({
      _id: listingId
    }, function(err, listing){
        if(err) return res.send(err);
        console.log("listing in UserTrail.js Route: ", listing);
        res.send(listing);
      })
  });

//get all trails -- from /UserTrails/:user
router.get('/:user', function(req, res, next) {
  let user = req.params.user
  Trail.find({userId: user}, function(err, records){
      if(err) return res.send(err);
      res.send(records);
  });
})

module.exports = router;
