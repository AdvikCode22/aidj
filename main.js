music = "";
lwristx = 0
lwristy = 0
rwristx = 0
rwristy = 0
lwristscore = 0
rwristscore = 0

function preload(){
    music = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    camera = createCapture(VIDEO);
    camera.hide();

    model = ml5.poseNet(camera , modelLoaded)
    model.on('pose' , gotPoses)
}

function modelLoaded(){
    console.log("Model is Loaded.")
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results)

        lwristscore = results[0].pose.keypoints[9].score
        console.log("left wrist score = " + lwristscore)

        rwristscore = results[0].pose.keypoints[10].score
        console.log("right wrist score = " + rwristscore)

        lwristx = results[0].pose.leftWrist.x
        lwristy = results[0].pose.leftWrist.y
        console.log("left wrist x = " + lwristx + " , left wrist y = " + lwristy)

        rwristx = results[0].pose.rightWrist.x
        rwristy = results[0].pose.rightWrist.y
        console.log("right wrist x = " + rwristx + " , right wrist y = " + rwristy)
    }
}

function draw(){
    image(camera,0,0,600,500);

    if(lwristscore > 0.2){
        fill("red")
        stroke("red")
        circle(lwristx , lwristy , 20)
        numberY = Number(lwristy)
        noDecimals = Math.floor(numberY)
        volume = noDecimals / 500
        music.setVolume(volume)
        document.getElementById("vol").innerHTML = "Volume: " + volume
    }

    if(rwristscore > 0.2){
        fill("purple")
        stroke("purple")
        circle(rwristx , rwristy , 20)
        if(rwristy <= 100){
            document.getElementById("rate").innerHTML = "Speed: 0.5x"
            music.rate(0.5)
        }
        else if(rwristy > 100 && rwristy <= 200){
            document.getElementById("rate").innerHTML = "Speed: 1x"
            music.rate(1)
        }
        else if(rwristy > 200 && rwristy <= 300){
            document.getElementById("rate").innerHTML = "Speed: 1.5x"
            music.rate(1.5)
        }
        else if(rwristy > 300 && rwristy <= 400){
            document.getElementById("rate").innerHTML = "Speed: 2x"
            music.rate(2)
        }
        else if(rwristy > 400){
            document.getElementById("rate").innerHTML = "Speed: 2.5x"
            music.rate(2.5)
        }
    }
}

function playSound(){
    music.play();
}

function stopSound(){
    music.stop()
}

function pauseSound(){
    music.pause()
}