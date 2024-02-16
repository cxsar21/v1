const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img--area img"),
musicName = wrapper.querySelector(".song--details .name"),
musicArtist = wrapper.querySelector(".song--details .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play--pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
progressArea = wrapper.querySelector(".progress--area"),
progressBar = wrapper.querySelector(".progress--bar");



let musicIndex = 1;

window.addEventListener("load", ()=>{
    loadMusic(musicIndex); //carga musica en ventana
})

//carga funcion de musica
function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `img/${allMusic[indexNumb - 1].img}.jpg`;
    mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
}

//funcion de play musica
function playMusic(){
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}

//funcion de pausa musica
function pauseMusic(){
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}

//funcion de sigiente cancion
function nextMusic(){
    //aqui es el incremento del index de 1 (canciones)
    musicIndex++;
    //si el index de la musica es mayor que la longitud de la matriz se reproducira la primera cancion
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}


//funcion de cancion pasada
function prevMusic(){
    //aqui es el decremento del index de 1 (canciones)
    musicIndex--;
    //si el index de la musica es menor que la longitud de la matriz se reproducira la cancion pasada
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}
//pausa musica boton de evento
playPauseBtn.addEventListener("click", ()=>{
    const isMusicPaused = wrapper.classList.contains("paused");
    //Solo si la musica esta pausada uncionara, o se pondra play
    isMusicPaused ? pauseMusic() : playMusic();
});

//boton de siguient cancion
nextBtn.addEventListener("click", ()=>{
    nextMusic(); //funcion de siguiente cancion
});

//boton de regreso cancion
prevBtn.addEventListener("click", ()=>{
    prevMusic(); //funcion de siguiente cancion
});

//actualiza el progreso de la barra de la cancion
mainAudio.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime; //consigue el tiempo de la cancion
    const duration = e.target.duration; //consigue el total de la cancion
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector(".current"),
    musicDuration = wrapper.querySelector(".duration");    
    
    mainAudio.addEventListener("loadeddata", ()=>{
        //se actualiza el total de la duracion de la cancion
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if(totalSec < 10){ //agregando 0 si segundo es menor que 10
            totalSec = `0${totalSec}`; 
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });

     //se actualiza el total de la duracion de la cancion
     let currentMin = Math.floor(currentTime / 60);
     let currentSec = Math.floor(currentTime % 60);
     if(currentSec < 10){ //agregando 0 si segundo es menor que 10
         currentSec = `0${currentSec}`; 
     }
     musicCurrentTime.innerText = `${currentMin}:${currentSec}` ;
});

//actualizacion de reproduccion de la cancion acordando el progreso de la barra
progressArea.addEventListener("click", (e)=>{
    let progressWidthva1 = progressArea.clientWidth; //consigue el ancho de la progreso de la barra
    let clickedOffSetX = e.offsetX; //valor de 0 
    let songDuration = mainAudio.duration; //consigue el total de duracion de la cancion

    mainAudio.currentTime = (clickedOffSetX / progressWidthva1) * songDuration;
    playMusic();
});

// Repeticion de shuffle
const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", ()=>{
    // primero se pone el inner text del icono
    let getText = repeatBtn.innerText; //consigue el innertext del icono
    //vamos a a hacer las diferencias cambiando diferentes iconos usando un switch de click
    switch(getText){
        case "repeat": //si el icono se repite_one
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped"); 
            break;
        case "repeat_one": //si el icono esta repitiendo una vez
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playback shuffle");
            break;
        case "shuffle": //si el icono esta en shuffle una vez repetido
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playlist looped");
            break;
    }
});

//vamos a cambiar el icono, se va trabajar 
//despues el fin de la cancion

mainAudio.addEventListener("ended", ()=>{
    //vamos acordando el icono de menu si se usa el icono set
    //la cancion y se hara un acordando
    let getText = repeatBtn.innerText;
})

