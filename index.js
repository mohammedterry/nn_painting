//----------FUNCTIONS-------------
display = function(net, i, e, r){
  var context = document.getElementById('canvas').getContext('2d');     
  var image = context.getImageData(0, 0, 125, 125);  
    for (var x = 0; x < 125; x++) {
      for(var y = 0; y < 125; y++) {
        var rgb = net.run([x/125, y/125]);
        image.data[((4 * 125 * x) + (4 * y))] = rgb[0] * 255;
        image.data[((4 * 125 * x) + (4 * y))+ 1] = rgb[1] * 255;
        image.data[((4 * 125 * x) + (4 * y)) + 2] = rgb[2] * 255;
        image.data[((4 * 125 * x) + (4 * y)) + 3] = 255;           
      }
    }
    context.putImageData(image,0,0);
    document.getElementById('iteration').innerHTML = i;
    document.getElementById('error').innerHTML = e;
    document.getElementById('rate').innerHTML = r;    
  }


shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

getAccuracy = function(net, testData) {
  let hits = 0;
  testData.forEach((datapoint) => {
    const output = net.run(datapoint.input);
    const outputArray = [Math.round(output[0]), Math.round(output[1]), Math.round(output[2])];
    if (outputArray[0] === datapoint.output[0] && outputArray[1] === datapoint.output[1] && outputArray[2] === datapoint.output[2]) {
      hits += 1;
    }
  });
  return hits / testData.length;  
}


//-----------------------TRAINING & TEST DATA----------------------------------
var samples = []; //input
//var labels in rgb.js //outputs - normalised rgb data for "img.png" pixels

for (var x = 0; x < 125; x+=1)
  {
    for(var y = 0; y < 125; y+=1)
    {
      samples.push([x/125,y/125]);  //input = [x,y] coords of photo pixels
    }
  }

  const orderedData = samples.map((sample,index) => {
      return {
          input: sample,
          output: labels[index]
      }
  });
  const trainData = shuffle(orderedData);
  const testData = trainData;
  //const DATA = shuffle(orderedData);
  //const SPLIT = 14000;
  //const trainData = DATA.slice(0, SPLIT);
  //const testData = DATA.slice(SPLIT + 1);
  //--------------CREATE NETWORK & TRAIN IT--------------------
  const net = new brain.NeuralNetwork({  //feedforward network
    activation: 'sigmoid', // activation function
    hiddenLayers: [5, 5, 5],
    iterations: 20000,
    learningRate: 0.5 // global learning rate, useful when training using streams
  });

  net.train(trainData, { //initialise network
    iterations: 1,
    learningRate: 0.3
  });
    
  var iteration = 1;
  var maxIter = 20000;
  var errorThresh = 0.001;
  var refreshRate = setInterval(function() {
    if ((iteration > maxIter) || (error < errorThresh)) {
      clearInterval(refreshIntervalId);
    }  
    iteration++;     
    error = net.iterate(trainData);    
    net.learningRate = 1/(1+.005*iteration); //dynamic learning rate;    
    display(net, iteration, error, net.learningRate);        
    }, 1)

  //------------------DISPLAY TRAINING SCORE-----------------------
  const accuracy = getAccuracy(net, testData);
  