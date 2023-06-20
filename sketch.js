// Javascript for Sound Artists - Session 2/3 - Audio Seuqencer (in progress)
// Brandon Lincoln Snyder - Browser Sound X WebSoundArt
// This audio sequencer tutorial is an adaptation of Dan Tramte's YouTube tutorials "Browser Noise"

let hh, clap, kick; //container for an audio file

let hPat, cPat, kPat; //array of 1s and 0s (array)

let hPhrase, cPhrase, kPhrase // phrase. Defines how our hPat is interpreted. 

let seq; // part.

let toggleStart;// start stop button

let beatLength;

let cnv;

let sPat; // sequencer


function setup() {
  cnv = createCanvas(400, 100);
  cnv.mousePressed(canvasClicked);
  
  beatLength = 16;
  
  toggleStart = createButton('start/stop').position(10, height+ 10).mousePressed(() => {
   if (!seq.isPlaying) {
       seq.loop();
     toggleStart.html('Playing');
       } else {
      seq.stop();
    toggleStart.html('Stopped');
          }
  });
  
  
  
  //arrow function () => {}
  hh = loadSound('assets/hh.wav')
  clap = loadSound('assets/clap.wav')
  kick = loadSound('assets/kick.wav')
  
  hPat = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0];
  cPat = [0, 0, 0, 0, 0, 0, 0, 1, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0];
  kPat = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,1 ,0];
  
  sPat = [1,2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  
  // sPat = [];
  // for (let i = 1; i < beatLength + 1; i++) {
  //   sPat.push(i);
  // }
  
  hPhrase = new p5.Phrase('hh', function(time){hh.play(time);}, hPat);
  cPhrase = new p5.Phrase('clap', function(time){clap.play(time);}, cPat);
  kPhrase = new p5.Phrase('kick', function(time){kick.play(time);}, kPat);
  
  seq = new p5.Part();
  seq.addPhrase(hPhrase);
  seq.addPhrase(cPhrase);
  seq.addPhrase(kPhrase);
  
  //sequence stepper
  seq.addPhrase('seq', sequence, sPat);
  //the clalback function is given two arguments: time and the index value of the array (from the third argument)
  
  seq.setBPM(120);
  
  drawMatrix();
  drawPlayhead();

}

function draw() {
 
}


function canvasClicked() {
  let rowClicked = floor(mouseY/height*3);
   let columnClicked = floor(mouseX/width*beatLength);
  
  if (rowClicked == 0) {
    hPat[columnClicked] = invert(hPat[columnClicked]);
  } else if (rowClicked == 1) {
    cPat[columnClicked] = invert(cPat[columnClicked]);
  } else if (rowClicked == 2) {
    kPat[columnClicked] = invert(kPat[columnClicked]);
  }
  
drawMatrix();
  
}

function invert(inputBit) {
  if (inputBit == 0) {return 1} else {return 0};
}

// function invert(inputBit) {
//   return inputBit === 1 ? 0 : 1;
// }

// function invert(inputBit) {
//   return 1 - inputBit;
// }

function drawMatrix() {
   background(220);
  stroke('black');
  fill('white');
  
  //vertical grid 
  for (let i = 0; i < beatLength; i++) {
    line(i*width/beatLength, 0, i*width/beatLength, height)
  }
  
  //horiz grid
  for (let i = 0; i < 3; i++){
    line(0, i*height/3, width, i*height/3)
  }
  
  for (let i = 0; i < beatLength; i++) {
      
      if(hPat[i] == 1) {
        ellipse(i * width/beatLength + 0.5*width/beatLength, 1/6*height, 10);
      }
      
      if(cPat[i] == 1) {
         ellipse(i * width/beatLength + 0.5*width/beatLength, 1/2*height, 10);
      }
      
      if(kPat[i] == 1) {
      ellipse(i * width/beatLength + 0.5*width/beatLength, 5/6*height, 10) ;
      }
    }
}

function sequence(time, beatIndex) {
  setTimeout(() => {
    drawMatrix();
  drawPlayhead(beatIndex);
  }, time*1000) // callback function, time(ms)
  
}

function drawPlayhead(beatIndex) {
  //rectangenle
  
  stroke ('red');
  fill (255,0, 0, 30);
  rect(width/beatLength*(beatIndex-1),0, width/beatLength, height); //4 arguments. two coordinates, the opposite corners of a rectangle
}


