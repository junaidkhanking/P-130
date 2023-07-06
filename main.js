song ="";
music = "";
leftWristX = "";
leftWristY = "";
rightWristX = "";
rightWristY = "";
score_leftWrist="";
score_rightWrist= "";
statusOfTheSong = "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    song = loadSound("song.mp3");
    music = loadSound("music.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("red");
    stroke("pink");

    if(score_leftWrist > 0.2)
    {
    circle(leftWristX, leftWristY, 20);
    if(song.isPlaying())
    {
        song.stop()
    }
    music.play();
    document.getElementById("song_id").innerHTML = "Playing Harry Potter Theme Song";
    }

    if(score_rightWrist>0.2)
    {
        circle(rightWristX, rightWristY, 20);
        if(music.isPlaying())
        {
            music.stop()
        }
        song.play();
        document.getElementById("song_id").innerHTML = "Playing Beliver Remix";
    }
    }


function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);
        score_rightWrist = results[0].pose.keypoints[10].score;
        score_leftWrist = results[0].pose.keypoints[9].score;
        console.log(score_leftWrist + score_rightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+leftWrist_x+" leftWristY = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+rightWrist_x+" rightWristY = "+rightWrist_y);
    }
}

function stop()
{
    if(song.isPlaying())
    {
        song.stop()
    }
    if(music.isPlaying())
    {
        music.stop()
    }
}