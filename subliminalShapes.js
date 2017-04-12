//SUMBLIMINAL SHAPES #1       |       Web Art Installation
//Filippo Guida, oct 2015     |       © All Rights Reserved

//Global Variables
var mousePar  = 0;
var touchRand = 0;
var blinkPar  = 0;

//Initialize (add canvas to a background-container element in HTML file)
window.onload = function()
{
  var container = document.getElementById("subliminalShapesContainer");
  var canvas    = document.getElementById("subliminalShapesCanvas");
  var ctx       = canvas.getContext("2d");
  var  scroll   = 0;

  canvas.width                          = window.innerWidth;
  canvas.height                         = window.innerHeight;

  container.style.backgroundColor       = "black";
  ctx.fillStyle                         = "white";

  var video                             = document.createElement('video');
  video.autoplay                        = true;
  video.muted                           = true;
  video.src                             = 'subliminalShapes.m4v';
  video.playbackRate                    = 10;

  function manipulation()
  {
    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);  //resize Image

    var pixels  = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < pixels.data.length-4; i = i + 4*4) //reduce resoluction
    {
      var luminance = (0.34 * pixels.data[i] + 0.5 * pixels.data[i + 1] + 0.16 * pixels.data[i + 2])/255;
      luminance += mousePar/1000;

      if (luminance < frame.param2)
      {
        ctx.fillRect((i/frame.param1)%canvas.width, Math.ceil(i/canvas.width), (1-luminance)*frame.param3, luminance*frame.param3);
      }
      if (luminance > frame.param2)
      {
        ctx.fillRect((i/frame.param1)%canvas.width, Math.ceil(i/canvas.width), luminance*frame.param4, (1-luminance)*frame.param3);
      }
    }
  }

  var frame = {}, tiltRate;
  function draw()
  {
    time     = 100/Math.floor(2+Math.random()*10);
    index     = 900+Math.floor(Math.random()*10);

    frame.param0 = time;
    frame.param1 = [3, 6, 1, 1, 1, 16, 12][Math.floor(Math.random()*7)] + Math.floor(blinkPar*Math.random());
    frame.param2 = 0.1+0.9*Math.random() + Math.floor(blinkPar*Math.random());
    frame.param3 = Math.floor(4*Math.random()) +  Math.floor(blinkPar*Math.random());
    frame.param4 = Math.floor(time/2) + Math.floor(blinkPar*Math.random());

    manipulation();
    setTimeout(function(){draw()}, time+touchRand-mousePar/100);
  }
  draw();

  var timestamp, lastMouseX, lastMouseY, timeout;
  window.onmousemove = function(e)
  {/*
    if (timestamp === null) {
           timestamp = Date.now();
           lastMouseX = e.screenX;
           lastMouseY = e.screenY;
           return;
    }

    var now = Date.now();
    var dt =  now - timestamp;
    var dx = e.screenX - lastMouseX;
    var dy = e.screenY - lastMouseY;
    var speedX = Math.round(dx / dt * 100);
    var speedY = Math.round(dy / dt * 100);*/
    mousePar = (e.screenX+e.screenY)/30;
/*
    timestamp = now;
    lastMouseX = e.screenX;
    lastMouseY = e.screenY;
*/
    clearTimeout(timeout);
    timeout = setTimeout(
      function(){ if (Math.random() <= 0.85) mousePar=0; }, 6*Math.pow(10, Math.floor(4*Math.random())) );
  }

  var blinkTimeout, blinkStatus = 0;
  document.body.onmousedown = function(e)
  {
    function blink()
    {
      if (blinkStatus == 0)
      {
        container.style.backgroundColor = "black";
        ctx.fillStyle                   = "white";
        blinkStatus = 1;
      }
      else
      {
        container.style.backgroundColor = "white";
        ctx.fillStyle                   = "black";
        blinkStatus = 0;
      }
      blinkTimeout = setTimeout(function(){blink()}, 10);
    }
    blink();
    blinkPar = Math.floor(80*Math.random());
  }

  document.body.onmouseup = function(e)
  {
    clearTimeout(blinkTimeout);
    if (Math.random() <= 0.85)
    {
      container.style.backgroundColor   = "black";
      ctx.fillStyle                     = "white";
    }
    else
    {
      container.style.backgroundColor   = "white";
      ctx.fillStyle                     = "black";
    }
    if (Math.random() >= 0.5) {blinkPar = 0;}
  }

};
