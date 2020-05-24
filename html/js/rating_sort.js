
// https://github.com/rhardin/node-pnormaldist
//
function pnormaldist(qn) {
  var b = [1.570796288, 0.03706987906, -0.8364353589e-3,
           -0.2250947176e-3, 0.6841218299e-5, 0.5824238515e-5,
           -0.104527497e-5, 0.8360937017e-7, -0.3231081277e-8,
           0.3657763036e-10, 0.6936233982e-12],
      w1 = qn,
      w3 = -Math.log(4.0 * w1 * (1.0 - w1)),
      i = 1;

  if (qn < 0.0 || qn > 1.0) { return 0.0; }
  if (qn === 0.5) { return 0.0; }
  if (qn > 0.5) { w1 = 1.0 - w1; }

  w1 = b[0];
  for (i; i < 11; i++) {
    w1 += b[i] * Math.pow(w3, i);
  }

  if (qn > 0.5) { return Math.sqrt(w1 * w3); }

  return -Math.sqrt(w1 * w3);
};

// Standard Normal variate using Box-Muller transform.
//  answered Apr 7 '16 at 15:41 Maxwell Collard
//
function randn_bm() {
    var u = 0, v = 0;

    // Converting [0,1) to (0,1)
    //
    while(u === 0) { u = Math.random(); }
    while(v === 0) { v = Math.random(); }
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

// https://www.evanmiller.org/how-not-to-sort-by-average-rating.html
//
function ci_lower_bound(n_up, n_tot, conf) {
  if (n_tot==0) { return 0.0; }

  var z = pnormaldist(1.0 - ((1.0 - conf)/2.0) );
  var phat = (n_up / n_tot);
  var zsqn = z*z/n;

  //    (phat + 
  //     z*z/(2*n) - 
  //     z * Math.sqrt((phat*(1-phat)+z*z/(4*n))/n)) / (1+z*z/n)
  //
  var res = (phat + (zsqn/2.0) - ( z*Math.sqrt( ((phat*(1.0-phat)) + (zsqn/4.0))/n ))) / (1.0 + zsqn) ;

  return res;
}

// https://www.evanmiller.org/ranking-items-with-star-ratings.html
//
function bayesian_approximation(rating, conf, point_val) {
  var N = 0, K = rating.length;

  for (var ii=0; ii<rating.length; ii++) {
    N += rating[ii];
  }

  var z = pnormaldist(1.0 - ((1.0 - conf)/2.0) );
  var v = [];
  if (typeof point_val === "undefined") {
    for (var ii=0; ii<K; ii++) {
      v.push(ii+1);
    }
  }
  else {
    for (var ii=0; ii<point_val.length; ii++) {
      v.push(point_val[ii]);
    }
  }

  var term0 = 0.0;
  var ss = 0.0;
  var s2 = 0.0;
  for (var ii=0; ii<K; ii++) {
    term0 += v[ii]*(rating[ii] + 1) / (N+K);

    ss += v[ii]*v[ii]*(rating[ii] + 1)/(N+K);
    s2 += v[ii]*(rating[ii] + 1)/(N+K);
  }

  s2*=s2;

  var res = term0 - (z*Math.sqrt( (ss - s2)/(N+K+1) ));

  return res;

}

/*
var n = 1000;
for (var ii=1; ii<n; ii++) {
  var x = ii/n;
  console.log(x, pnormaldist(x));
}
process.exit();
*/

/*
for (var n=1; n<100; n+=1) {
  for (var ii=0; ii<=n; ii++) {
    var x = ii;
    var y = ci_lower_bound(ii, n, 0.95);
    console.log(x,y);
  }
  console.log("");
}
*/

var rating_info = {};

var fs = require('fs');
var dat = fs.readFileSync('ok', 'utf8');
var a = dat.split("\n");
for (var ii=0; ii<a.length; ii++) {
  if (a[ii].length == 0) { continue; }


  var tok = a[ii].split(" ");
  var id_rat = tok[0].split(",");

  var movie_id = parseInt(id_rat[0]);
  var rat = parseFloat(id_rat[1]);
  var freq = parseFloat(tok[1]);

  if (!(movie_id in rating_info)) {
    rating_info[movie_id] = [0,0,0,0,0];
  }

  rating_info[movie_id][ Math.floor(rat)-1 ] += freq;

  //console.log(ii, id_rat[0], id_rat[1], tok[1]);
}

for (var movie_id in rating_info) {
  var ord = bayesian_approximation(rating_info[movie_id], 0.95);
  console.log(movie_id, ord);
}
