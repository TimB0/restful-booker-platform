var express = require('express');
var router  = express.Router(),
    parse   = require('../helpers/parser')
    Hotel   = require('../models/hotel'),
    Booking = require('../models/booking'),
    creator = require('../helpers/bookingcreator');

router.get('/ping', function(req, res, next) {
  res.sendStatus(201);
});

router.get('/search',function(req, res, next){
  var hotelQuery = {},
      bookingQuery = {},
      collection = {};

  hotelQuery.name = { $regex: '.*' + req.query.keyword + '.*' };

  bookingQuery = {'$or' : [
    { "firstname": {$regex: '.*' + req.query.keyword + '.*'}},
    { "lastname": {$regex: '.*' + req.query.keyword + '.*'}}
  ]}

  Booking.search(bookingQuery, function(err, record){
    if (err) res.sendStatus(500);

    if(record.length > 0) collection.bookings = record;

    Hotel.search(hotelQuery, function(err, record){
      if (err) res.sendStatus(500);

      if(record.length > 0) collection.hotels = record;

      res.send(collection);
    });
  });
});

module.exports = router;
