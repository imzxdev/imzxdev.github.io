// Flicker effect on links
const links = document.querySelectorAll('.link');
links.forEach(link => {
  let flickerTimeout;
  let flickerActive = false;
  function flickerLoop() {
    if (!flickerActive) return;
    link.classList.add('glitch-flicker');
    setTimeout(() => {
      link.classList.remove('glitch-flicker');
      if (!flickerActive) return;
      flickerTimeout = setTimeout(flickerLoop, 3000 + Math.random() * 2000);
    }, 500);
  }
  link.addEventListener('mouseenter', () => {
    flickerActive = true;
    flickerLoop();
  });
  link.addEventListener('mouseleave', () => {
    flickerActive = false;
    clearTimeout(flickerTimeout);
    link.classList.remove('glitch-flicker');
  });
});

// Audio playlist logic
const playlistPlayer = document.getElementById('playlistPlayer');
const nowPlaying = document.getElementById('nowPlaying');

const songs = ["songs/1.mp3", "songs/2.mp3", "songs/3.mp3", "songs/4.mp3"];
let currentSong = 0;

function playSong(index) {
  playlistPlayer.src = songs[index];
  playlistPlayer.load();
  playlistPlayer.play().then(() => {
    console.log(`Playing: ${songs[index]}`);
    nowPlaying.textContent = `Now playing: ${songs[index].split('/').pop()}`;
  }).catch(err => {
    console.warn('Playback failed:', err);
  });
}

playlistPlayer.addEventListener('ended', () => {
  currentSong = (currentSong + 1) % songs.length;
  playSong(currentSong);
});

function startPlaylist() {
  playSong(currentSong);
  window.removeEventListener('click', startPlaylist);
  window.removeEventListener('keydown', startPlaylist);
  console.log('User interaction detected, playlist started.');
}

window.addEventListener('click', startPlaylist);
window.addEventListener('keydown', startPlaylist);
