//the car problem

//set of 'D' drivers
  //made up of 'd' => individual drivers
    //have T[d], which is "an ordered list of assigned tasks,"
      //each t in T[d] with a location

//goal: insert a new task (location) into one of the T[d] "so as to minimize total increase in route length"

/*
Part 1 - Build a naive solution that produces the optimal solution and benchmark the performance for a known set of random data. You may generate semi-realistic data any way you like. It doesn't need to be distributed like actual deliveries but should at least have all unique points. Benchmark the runtime for 1k, 10k, and 100k drivers each with 25 tasks.
*/


/*solution:
T[d] = [A, B, C, D, E], all objects with X and Y

var smallestDistance = {distance: 2, someWayToRememberWhere}

Moving through 2, 1 at a time
AQ + QB - AB = added distance
if (added distance < smallestDistance.distance) {
  overwrite smallestDistance, with the current points
}

do that for all d in D.
*/


/*
//1. Set up the problem
40 minutes
    //a. ordered list of assigned tasks -- can i use a linked list? constant insertion, there is literally never a need to iterate back and forth or search a point for the naive solution. always scan the whole list
      //hold a reference to the task (location) object that you want to insert after
      //Edge cases for the head and tail
      //keep track of the distance added for shits and gigs

49 minutes
    //b core logic.
        function calculateDfference (A, B, Q)
        -- calls calculateDistance on  A,B, and A,Q + Q,B; pythagorian
    //

40 minutes
    //c. generator for fake locations. unique points [-10000, 100000] or something big because no reason not to have big numbers for oordinates. make it look a bit more legit

20 minutes
    //d. benchmark the runtime -- mocha had stuff for this, but just learn that all over kuz you don't remember shit
*/

function distanceCalculator(start, end) {
  var x = start.x - end.x;
  var y = start.y - end.y;
  if (x < 0) {
    x = -x;
  }
  if (y < 0) {
    y = -y;
  }
  return Math.sqrt(x*x + y*y);
};

var a = {
  x: 10,
  y: 15
}
var b = {
  x: 4,
  y: 7
}

console.log(distanceCalculator(a, b));