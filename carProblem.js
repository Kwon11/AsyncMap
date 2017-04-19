/*
Inserting tasks to minimize total route length increase:

Problem statement: Given a set of drivers D, each d in D with an ordered list of assigned tasks T(d), each t in T(d) with a location. The goal is to insert a new task into one of the assigned task lists (at the start, between any pair of tasks or at the end) so as to minimize the total increase in route length (where the distance for a route is the sum of distances between adjacent tasks). Distance here may be Euclidean.

Part 1 - Build a naive solution that produces the optimal solution and benchmark the performance for a known set of random data. You may generate semi-realistic data any way you like. It doesn't need to be distributed like actual deliveries but should at least have all unique points. Benchmark the runtime for 1k, 10k, and 100k drivers each with 25 tasks.

Part 2 - Improve the approach to scale sub-linearly with the number of total possible assignments, (25 + 1) * driversCount here. Since it may be hard to produce the exact solution, you may use any reasonable heuristics etc to achieve this goal. You should briefly justify your solution and provide benchmark results with the same dataset from the previous part.

*/

/*
//1. Set up the problem
40 minutes
  //figure out max latitude and longitude for san francisco DONE
  //learn and apply the distance formula to the compareDistance function DONE
  //generate linked lists of random points
*/

//figure out how to generate linked lists with random coordinates

var latitudeLimits = [37.714038, 37.808612];
var longitudeLimits = [-122.407478, -122.502870];
/*


49 minutes
    //b core logic.
        function calculateDfference (A, B, Q)
        -- calls calculateDistance on  A,B, and A,Q + Q,B; pythagorian
    //
*/

function insertTask (task) {
  for (var i = 0; i < drivers.length; i++) {
    //figure out how to start the process
  }
}

function compareDistance(a, b, q) {
  var original = distanceCalculator(a, b);
  var newDistance = distanceCalculator(a, q) + distanceCalculator(q, b);
  var additionalDistance = newDistance - original;
  if (additionalDistance < 0) {
    console.log('something is fucked');
  }
  if (currentSmallest > additionalDistance) {
    currentSmallest = additionalDistance;
    locationToInsertAfter = a;
  }
}

function distanceCalculator(start, end) {
  var radiusOfEarth = 6371; //change to san fran later
  var latDifference = makeRadians(start.latitude) - makeRadians(end.latitude);
  var lonDifference = makeRadians(start.longitude) - makeRadians(end.longitude);
  if (latDifference < 0) {
    latDifference = -latDifference;
  }
  if (lonDifference < 0) {
    lonDifference = -lonDifference;
  }

  var a = Math.sin(latDifference/2) * Math.sin(latDifference/2) + Math.sin(lonDifference/2) * Math.sin(lonDifference/2) * Math.cos(makeRadians(start.latitude)) * Math.cos(makeRadians(end.latitude));
  var c = 2 * Math.asin(Math.sqrt(a));
  return radiusOfEarth * c;
};

function makeRadians(degree) {
  return degree * Math.PI / 180;
};

//console.log(distanceCalculator({longitude: -122.407478, latitude: 37.714038}, {longitude: -122.502870, latitude: 37.808612}));
//google maps says the walking route ^ is about 9.1 miles. As the crow flys eyeball-estimate 8.5, which is pretty close to the answer in kilometers.

/*

40 minutes
    //c.
20 minutes
    //d. benchmark the runtime -- mocha had stuff for this, but just learn that all over kuz you don't remember shit
*/


var a = {
  x: 10,
  y: 15
}
var b = {
  x: 4,
  y: 7
}