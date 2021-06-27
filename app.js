const start = document.getElementById("start");
const stop = document.getElementById("stop");
const video = document.getElementById("video");

var displayMediaOptions = {
    video: {
      cursor: "always"
    },
    audio: false
  };

const startCapture = async()=>{
    try{
       
        video.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
        
        const data =[];
        const mediaRecorder = new MediaRecorder(video.srcObject)
        mediaRecorder.start();
        mediaRecorder.ondataavailable = (e)=>{
            data.push(e.data);
        };

        mediaRecorder.onstop = e =>{
            video.src = URL.createObjectURL(
                new Blob(data,{type:data[0].type})
            )
 
        };
    }catch(e){
        console.log(e);
    }
};

const endCapture = ()=>{
    let tracks = video.srcObject.getTracks();
    tracks.forEach(track => track.stop());
    video.srcObject = null;
};


start.addEventListener("click",()=>{startCapture()});
stop.addEventListener('click',()=>{endCapture()});