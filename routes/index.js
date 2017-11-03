var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request')

var api_key = 'e3ee2c3b59385aa25d9bf31dce1bb0a4';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('weather.html', { root:  'public' });
});

var myURL = 'https://api.themoviedb.org/3/search/movie?api_key='+api_key+'&query='
router.get('/query', function(req, res, next) {
  var queryText = (req.query.t);
  var tempURL = myURL + queryText;
  
  console.log(tempURL);

  request(tempURL).pipe(res);
});

var popularURL = 'https://api.themoviedb.org/3/discover/movie?api_key='+api_key+'&sort_by=popularity.desc';
var bestDramasURL = 'https://api.themoviedb.org/3/discover/movie?api_key='+api_key+'&with_genres=18&sort_by=vote_average.desc&vote_count.gte=10'
var tomCruiseURL = 'https://api.themoviedb.org/3/discover/movie?api_key='+api_key+'&with_cast=500&sort_by=vote_average.desc';

router.get('/filterSearch',function(req,res,next) {
  var queryText = (req.query.f);

  var tempURL;
  if (queryText == 'popular'){
    tempURL = popularURL;
  }else if (queryText == 'bestDramas'){
    tempURL = bestDramasURL;
  }else if (queryText == 'bestTomCruiseMovies'){
    tempURL = tomCruiseURL;
  }

  request(tempURL).pipe(res);
});

module.exports = router;
