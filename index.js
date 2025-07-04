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

const playlistPlayer = document.getElementById('playlistPlayer');

const songs = ["songs/1.mp3", "songs/2.mp3", "songs/3.mp3", "songs/4.mp3"];
let currentSong = 0;

function playSong(index) {
  playlistPlayer.src = songs[index];
  playlistPlayer.load();
  playlistPlayer.volume = 0.3;
  playlistPlayer.play().then(() => {
    console.log(`Playing: ${songs[index]}`);
  }).catch(err => {
    console.warn('Playback failed:', err);
  });
}

playlistPlayer.addEventListener('ended', () => {
  currentSong = (currentSong + 1) % songs.length;
  playSong(currentSong);
});

const overlay = document.getElementById('overlay');
const mainContent = document.getElementById('mainContent');

function startPlaylist() {
  playSong(currentSong);

  overlay.classList.add('fade-out');

  mainContent.classList.remove('hidden');
  mainContent.classList.add('fade-in');

  window.removeEventListener('click', startPlaylist);
  window.removeEventListener('keydown', startPlaylist);

  overlay.addEventListener('animationend', () => {
    overlay.style.display = 'none';
  }, { once: true });

  console.log('User interaction detected, playlist started.');
}

overlay.addEventListener('click', startPlaylist);
window.addEventListener('keydown', startPlaylist);
