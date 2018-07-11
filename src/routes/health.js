const express = require('express');
const router = express.Router();
const SampleManager = require("../SamplerManager");
const { db } = require("../util/Db");

router.get('/', function(req, res, next) {
	res.json(SampleManager.getHealth(db));
});

router.get('/avg', function(req, res, next) {
	res.json(SampleManager.getLastHourAvgAvailability(db));
});
  
module.exports = router;