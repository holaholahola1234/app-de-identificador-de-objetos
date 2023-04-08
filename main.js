var previousResult= "";
function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier("MobileNet",modelLoad)
}

function modelLoad(){
  console.log ("modelo cargado")

}

function draw(){
  image(video,0,0,300,300)
  classifier.classify( video,gotResult )
}

function gotResult(error,result){
  if(error){
    console.error(error)
  }
  else{
    console.log(result)
     if((result[0].confidence>0.5)&&(previousResult!=result[0].label)){

     previousResult=result[0].label
     var synth=window.speechSynthesis;
     var speakData="El objeto detectado es"+result[0].label;
     var utterthis=new SpeechSynthesisUtterance(speakData);
     synth.speak(utterthis)

      document.getElementById("result").innerHTML=result[0].label
      document.getElementById("confianza").innerHTML=result[0].confidence.toFixed(2)+"%"

      }
    
   }
 
}