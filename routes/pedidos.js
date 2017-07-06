var express = require('express');
var router = express.Router();


//insert
router.post('/Insert/', function(req, res, next) {

  var Data = req.body;

  DB.query("")
  .spread((Result, Metadata) => {
      res.json(Result);
  });
});

module.exports = router;
