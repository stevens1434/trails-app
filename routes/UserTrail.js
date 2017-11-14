var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Trail = require('../models/trail');


//get specific trail -- from /trails/:user/:trailid
router.get('trail/:user/:trailId', function(req, res, next){
  // let user = req.params.user
  // console.log("userId in savings route: ", user);
  //   BankRecord.find({
  //     isSaved: 'true',
  //     userId: user
  //   }, function(err, records){
  //       if(err) return res.send(err);
  //       console.log("results of SavingsSummary get: ", records);
  //       res.send(records);
  //   })
});

//delete from db -- from /UserTrails parent
router.put('/', function(req, res, next){
    let id = req.body.data._id
    console.log("id in UserTrail route: ", id._id);
    Trail.findByIdAndRemove({_id: id},
       function(err, item){
        if(err) res.json(err);
        else res.end();
    });
});

//get all trails -- from /UserTrails/:user
router.get('/:user', function(req, res, next) {
  console.log("getting trails from db: ");
  let user = req.params.user
  console.log("userId in usertrail routes: ", user);
  Trail.find({userId: user}, function(err, records){
      if(err) return res.send(err);
      res.send(records);
  });
})

module.exports = router;
