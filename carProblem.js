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
var longitudeLimits = [-122.502870, -122.407478];
var tasksPerDriver = 25;
/*


49 minutes
    //b core logic.
        function calculateDfference (A, B, Q)
        -- calls calculateDistance on  A,B, and A,Q + Q,B; pythagorian
    //
*/
function Driver () {
  this.T = new TaskList(); //length and head property
}

function Task() {
  this.latitude = randomCoordinates(latitudeLimits);
  this.longitude = randomCoordinates(longitudeLimits);
  this.next = null;
}

function TaskList() {
  this.length = 0;
  this.head = null;
  this.tail = null;

  this.addToTail = function (task) {
    if (this.head === null) { //if head is nothing,
      this.head = task; //make the head a new node, which has its own .next
      this.head.next = null; //point that .next to null
      this.tail = this.head; //keep the tail on the last link
      this.length++;
    } else { //if the head exists
      this.tail.next = task; //turn the pointer of the last object into the new object
      this.tail = this.tail.next; //then turn the pointer into the next of this new object (this new tail)
      this.length++;
    }
  }

  this.addAfterNode = function (node) {

  };

  this.populateTasks = function () {
    for (var i = 0; i < tasksPerDriver; i++) {
      var newTask = new Task();
      this.addToTail(newTask);
    }
  }
};

function compareDistance(a, b, q) {
  var original = distanceCalculator(a, b);
  var newDistance = distanceCalculator(a, q) + distanceCalculator(q, b);
  var additionalDistance = newDistance - original;
  if (additionalDistance < 0) {
    console.log('something is fucked your distance got a negative');
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
  return radiusOfEarth * c;//haversine formula applied to start and end, returns km;
};

function makeRadians(degree) {
  return degree * Math.PI / 180;
};

function randomCoordinates (limits) {
  //take random number, multiply by difference, add to minimum
  var range = limits[1] - limits[0];
  var coordinate = Math.random() * range + limits[0];
  return coordinate;
}

//console.log(distanceCalculator({longitude: -122.407478, latitude: 37.714038}, {longitude: -122.502870, latitude: 37.808612}));
//google maps says the walking route ^ is about 9.1 miles. As the crow flys eyeball-estimate 8.5, which is pretty close to the answer in kilometers.

// var testList = new TaskList ();
// testList.populateTasks();
// var pointer = testList.head;
// while (pointer !== null) {
//   console.log('latitude:', pointer.latitude);
//   console.log('longitude:', pointer.longitude);
//   pointer = pointer.next;
// }


/*
20 minutes
    //d. benchmark the runtime -- mocha had stuff for this, but just learn that all over kuz you don't remember shit
*/
