//async.maplimit implementation
//has to asynchronously call mapFunc on every item in the collection and return the new collection
var globalIndexCounter;

function mapLimit (collection, concurrency, mapFunc, doneFunc) {

  var newCollection;
  globalIndexCounter = concurrency; //if it can run 5 processes, it should start on the 5th index, since 0-4 will be called at initialization

  for (var currency = 0; currency < concurrency; currency++) { //fires off 5 mapFunc calls, globalIndexCounter = 5
    mapFunc(collection[currency], callback);
  }



function callback (newItem, index) {
  //for calls greater than concurrency, this can just write based off the global counter
  //for the first "concurrency" number of calls, how does it know which one?
  newCollection[index] = newItem;
}

function mapFunc (item, cb) { //takes up some time then passes a new value to callback
  for (var i = 0; i < value * value * value; i++) {
    for (var j = 0; j < value * value + value; j++) {
      var x = j * i;
    }
  }
  if (globalIndexCounter < collection.length) {
    cb(value*2, globalIndexCounter);
  } else {
    doneFunc(false, newCollection);
  }
}

function doneFunc (err, newCollection) { //returns newCollection
  if (err) {
    console.log('error');
  }
  return newCollection;
} //I defined the functions separately to make it easier to understand for myself

}

mapLimit(10, 10, 10, 10);


