song=""
modelstatus=""
objects=[]
function setup(){
canvas=createCanvas(600,500)
canvas.center()
video=createCapture(VIDEO)
video.size(600,500)
video.hide()
objectdetector=ml5.objectDetector('cocossd',modelLoaded)
document.getElementById("status").innerHTML="status:detectingobject"
}
function modelLoaded(){
    console.log("modelisloaded")
    modelstatus=true
   
}
function gotresults(error,results){
if(error){console.log(error)}
else{
    console.log(results)
    objects=results
}
}

function draw(){
    image(video,0,0,600,500)
    if(modelstatus!=""){
        objectdetector.detect(video,gotresults)
        r=random(255)
        g=random(255)
        b=random(255)
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="status:objectdetected"
            document.getElementById("numberobject").innerHTML="numberofobjectdetectedare"+objects.length
            fill(r,g,b)
            percent=floor(objects[i].confidence*100)
            text(objects[i].label+ ""+percent+"%",objects[i].x+15,objects[i].y+15)
            noFill()
            stroke(r,g,b)
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
            document.getElementById("numberobject").innerHTML="babyfound"
            song.stop()
        }
    }
    else{
        song.play()
        document.getElementById("numberobject").innerHTML="babynotfound"
    }
}
function preload(){
    song=loadSound('babysong.mp3')
}
function play(){
    song.play()
    song.setVolume(1)
    song.rate(1)
}