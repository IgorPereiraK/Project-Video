let videoContainer = document.getElementById("videoContainer");
let video = document.getElementById("video");
let currentTime = document.getElementById("currentTime");
let totalTime = document.getElementById("totalTime");
let controls = document.getElementById("controls");
let playStopIcon = document.getElementById("playStopIcon");
let progressBarra = document.getElementById("progressBarra");
let inputProgressBarra = document.getElementById("inputProgressBarra");
let volumeContainer = document.getElementById("volumeContainer");
let iconVolume = document.getElementById("iconVolume");
let inputVolumeBarra = document.getElementById("inputVolumeBarra");
let footerContainer = document.getElementById("footerContainer");
let counter;

onload = function() {
    video.addEventListener("timeupdate", progressBarraWidth);
    video.addEventListener("dblclick", fullscreen);
    video.addEventListener("click", playStop);
    videoContainer.addEventListener("mouseover", showControls);
    volumeContainer.addEventListener("mouseover", showVolumeBarra);
    footerContainer.addEventListener("mouseover", showFooterContainer);
    video.addEventListener("play", countTime);
    inputVolumeBarra.addEventListener("change", volumeBarraValue);
};

function calcTime(value) {
    var sec = parseInt(value);
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - hours * 3600) / 60);
    let seconds = sec - hours * 3600 - minutes * 60;
    if (hours == 0){
        return minutes + ":" + (seconds >= 10 ? seconds : "0" + seconds);
    } else{
        return hours + ":" + (minutes >= 10 ? minutes : "0" + minutes) + ":" + (seconds >= 10 ? seconds : "0" + seconds);
    }
}

function countTime() {
    totalTime.innerHTML = calcTime(video.duration);
    counter = setInterval(function () {
        currentTime.innerHTML = calcTime(video.currentTime);
    }, 1000);
}

function showFooterContainer() {
    footerContainer.style.height = "115px";
    footerContainer.addEventListener("mouseleave", function () {
        footerContainer.style.height = "32px";
    });
}

function showVolumeBarra() {
    inputVolumeBarra.style.width = "80px";
    volumeContainer.addEventListener("mouseleave", function() {
        inputVolumeBarra.style.width = "0px";
        volumeContainer.style.width = "";
    });
}

function showControls() {
    controls.style.bottom = "0%";
    videoContainer.addEventListener("mouseleave", function() {
        controls.style.bottom = "-20%";
    })
}

function playStop() {
    if(video.paused) {
        playStopIcon.setAttribute("src", "./Videos/pause.png");
        video.play();
    } else{
        playStopIcon.setAttribute("src", "./Videos/play.png");
        video.pause();
    }
}

function videoTime() {
    timeCurrent = video.duration * (inputProgressBarra.value / 1000);
    video.currentTime = timeCurrent;
}

function progressBarraWidth() {
    time = video.currentTime * (1000 / video.duration);
    width = time / 10;
    progressBarra.style.width = `${width}%`;
}

function volumeBarraValue() {
    volume = inputVolumeBarra.value / 100;
    video.volume = volume;
    if (video.volume === 0) {
        iconVolume.setAttribute("src", "./Videos/muted.png");
    } else if (video.volume <= 0.3) {
        iconVolume.setAttribute("src", "./VIdeos/volumelow.png");
    } else if (video.volume <= 0.6) {
        iconVolume.setAttribute("src", "./Videos/volumemedium.png");
    } else {
        iconVolume.setAttribute("src", "./Videos/volume.png");
    }
}

function back() {
    video.currentTime -= 10;
}

function forward() {
    video.currentTime += 10;
}

function fullscreen() {
    video.requestFullscreen();
}

function aumentar_vel() {
    video.playbackRate += 0.5;
    currentVel(0.5)
}

function diminuir_vel() {
    video.playbackRate -= 0.5;
    currentVel(-0.5)
}

let velocidade = 0.5

function currentVel(e){
    let vel = document.querySelector("#vel");
    velocidade = velocidade + e
    vel.innerHTML = velocidade + "x"
    console.log(velocidade);
}