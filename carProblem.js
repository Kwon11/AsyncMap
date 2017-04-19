
//set up the parameters of the function
var latitudeLimits = [37.714038, 37.808612];
var longitudeLimits = [-122.502870, -122.407478];
var tasksPerDriver = 25;
var numberOfDrivers = 5;
var drivers = [];

//will turn "drivers" into a class
for (var i = 0; i < numberOfDrivers; i++) {
  drivers.push(new Driver);
}

var testTask = new Task();
AddTaskSomewhere(drivers, testTask);


function AddTaskSomewhere (drivers, task) {
  var smallestSoFar = null;
  var nodeToAddAfter = null; //if its a number, add as the first task for that driver. Else insert into this node at the end
  var driverID = null;

  for (var i = 0; i < drivers.length; i++) {
    console.log('checking driver', i);
    if (smallestSoFar === null) {
      smallestSoFar = distanceCalculator(task, drivers[i].T.head);
      nodeToAddAfter = i;
      driverID = i;
    } else if (smallestSoFar > distanceCalculator(task, drivers[i].T.head)) {
      nodeToAddAfter = i;
      smallestSoFar = distanceCalculator(task, drivers[i].T.head);
      driverID = i;
    }

    var pointer = drivers[i].T.head;
    while (pointer !== null) {
        if (compareDistance(pointer, task, smallestSoFar)) { //if it returns a number that means it was smaller
          smallestSoFar = compareDistance(pointer, task, smallestSoFar);
          nodeToAddAfter = pointer;
          driverID = i;
          console.log('given to driver', driverID, 'additional distance now', smallestSoFar);
        }
        pointer = pointer.next; //either way go to the next one
      }
    }


  if (typeof(nodeToAddAfter) === 'number') {
    task.next = drivers[nodeToAddAfter].head;
    drivers[nodeToAddAfter].head = task;
  } else {
    task.next = nodeToAddAfter.next;
    nodeToAddAfter.next = task;
  }
  console.log('The additional distance for new task is', smallestSoFar, ', it will be given to driver', driverID);
  return smallestSoFar;
}

function Driver () { //drivers come with tasks populated
  this.T = new TaskList();
  this.T.populateTasks();
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
    if (this.head === null) {
      this.head = task;
      this.head.next = null;
      this.tail = this.head;
      this.length++;
    } else {
      this.tail.next = task;
      this.tail = this.tail.next;
      this.length++;
    }
  }

  this.populateTasks = function () {
    for (var i = 0; i < tasksPerDriver; i++) {
      var newTask = new Task();
      this.addToTail(newTask);
    }
  }
};

function compareDistance(a, q, currentSmallest) {
  if (a.next === null) {
    console.log('finished checking this driver');
    if (currentSmallest > distanceCalculator(a, q)) {
      return distanceCalculator(a, q);
    } else {
      return false;
    }
  } else {
    console.log('checking another 2 points');
    var original = distanceCalculator(a, a.next);
    var newDistance = distanceCalculator(a, q) + distanceCalculator(q, a.next);
    var additionalDistance = newDistance - original;

    if (currentSmallest > additionalDistance) {
      console.log('replaced', currentSmallest, 'with', additionalDistance);
      return additionalDistance;
    }
    return false;
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
