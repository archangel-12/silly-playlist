let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'images/ab67616d0000b2738940ac99f49e44f59e6f7fb3.jpg',
        name : 'Where This Flower Blooms',
        artist : 'Tyler, The Creator, Frank Ocean',
        music : 'songs/where this flower blooms.mp3'
    },
    {
        img : 'images/ab67616d0000b2738940ac99f49e44f59e6f7fb3.jpg',
        name : 'See You Again',
        artist : 'Tyler, The Creator, Kali Uchis',
        music : 'songs/see you again.mp3'
    },
    {
        img : 'images/ab67616d0000b27322007a4aa8a55fe7b1de5632.jpg',
        name : 'IFHY',
        artist : 'Tyler, The Creator, Pharrell',
        music : 'songs/da real ifhy.mp3'
    },
    {
        img : 'images/ab67616d0000b2737005885df706891a3c182a57.jpg',
        name : 'Earfquake',
        artist : 'Tyler, The Creator',
        music : 'songs/earfquake.mp3'
    },
    {
        img : 'images/lol.jpg',
        name : 'goes to waste',
        artist : 'keshi',
        music : 'songs/goes to waste.mp3'
    },
    {
        img : 'images/gabriel.jpg',
        name : 'SOMEBODY',
        artist : 'keshi',
        music : 'songs/somebody.mp3'
    },
    {
        img : 'images/baindads.jpg',
        name : 'baindaids',
        artist : 'keshi',
        music : 'songs/baindaids.mp3'
    },
    {
        img : 'images/drunk.jpg',
        name : 'drunk',
        artist : 'keshi',
        music : 'songs/drunk.mp3'
    },
    {
        img : "images/lol pt.2.jpg",
        name : 'Modern Loneliness',
        artist : 'Lauv',
        music : 'songs/modern loneliness.mp3'
    },
    {
        img : 'images/war with heaven.jpg',
        name : 'War With Heaven',
        artist : 'keshi',
        music : 'songs/war with heaven.mp3'
    },
    {
        img : 'images/i met you when i was 18.jpg',
        name : 'Breathe',
        artist : 'Lauv',
        music : 'songs/breathe.mp3'
    },
    {
        img : 'images/ab67616d0000b2735355919e31efac9b14c45c49.jpg',
        name : 'Paris in the Rain',
        artist : 'Lauv',
        music : 'songs/pitr.mp3'
    },
    {
        img : 'images/ab67616d0000b2735355919e31efac9b14c45c49.jpg',
        name : 'The Story Never Ends',
        artist : 'Lauv',
        music : 'songs/tsne.mp3'
    },
    {
        img : 'images/ab67616d0000b273eaac2a7955f5b8967991cacb.jpg',
        name : 'Glimpse of us',
        artist : 'Joji',
        music : 'songs/glimpse of us.mp3'
    },
    {
        img : 'images/ab67616d0000b27353f6fa0d2589c6a7174f4b81.jpg',
        name : 'Gimme Love',
        artist : 'Joji',
        music : 'songs/gimme love.mp3'
    },
    {
        img : 'images/ab67616d0000b2737005885df706891a3c182a57.jpg',
        name : 'ARE WE STILL FRIENDS?',
        artist : 'Tyler, The Creator',
        music : 'songs/awsf.mp3'
    },
    {
        img : 'images/ab67616d0000b273733e6d7818eef87d20df86b5.jpg',
        name : 'Pluto Projector',
        artist : 'Rex Orange County',
        music : 'songs/pluto projector.mp3'
    },
    {
        img : 'images/ab67616d0000b27360ba1d6104d0475c7555a6b2.jpg',
        name : 'SLOW DANCING IN THE DARK',
        artist : 'Joji',
        music : 'songs/SLOW DANCING IN THE DARK.mp3'
    }
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
