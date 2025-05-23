document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audio-player');
    const tracks = document.querySelectorAll('.track');
    const playBtn = document.querySelector('.play-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const progressBar = document.querySelector('.progress');
    const currentTimeEl = document.querySelector('.current-time');
    const durationEl = document.querySelector('.duration');
    const trackTitle = document.querySelector('.track-title');
    const trackArtist = document.querySelector('.track-artist');
    const volumeSlider = document.querySelector('.volume-slider');
    
    let currentTrackIndex = 0;
    let isPlaying = false;

    // Initialize track durations
    function initializeTracks() {
        tracks.forEach((track, index) => {
            const audioTemp = new Audio();
            const trackSrc = track.getAttribute('data-src');
            audioTemp.src = trackSrc;
            
            audioTemp.addEventListener('loadedmetadata', function() {
                const duration = formatTime(audioTemp.duration);
                track.querySelector('.track-duration').textContent = duration;
            });

            // Klik op de track om af te spelen/pauzeren
            track.addEventListener('click', function(e) {
                // Voorkom dat de klik op de play-knop de track-klik activeert
                if (e.target.closest('.track-play')) {
                    return;
                }
                
                // Als dit de actieve track is, toggle dan play/pause
                if (currentTrackIndex === index && audioPlayer.src) {
                    if (isPlaying) {
                        pauseTrack();
                    } else {
                        playTrack();
                    }
                } else {
                    // Anders, laad en speel de nieuwe track
                    currentTrackIndex = index;
                    loadTrack(currentTrackIndex);
                    playTrack();
                }
            });
            
            // Klik op de play-knop in de track
            const playButton = track.querySelector('.track-play');
            playButton.addEventListener('click', function(e) {
                e.stopPropagation(); // Voorkom dat de track-klik wordt geactiveerd
                
                if (currentTrackIndex === index && audioPlayer.src) {
                    if (isPlaying) {
                        pauseTrack();
                    } else {
                        playTrack();
                    }
                } else {
                    currentTrackIndex = index;
                    loadTrack(currentTrackIndex);
                    playTrack();
                }
            });
        });
    }

    // Format time in minutes and seconds
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    // Load track
    function loadTrack(index) {
        if (index < 0) index = tracks.length - 1;
        if (index >= tracks.length) index = 0;
        
        currentTrackIndex = index;
        
        const track = tracks[index];
        const trackSrc = track.getAttribute('data-src');
        const trackName = track.querySelector('h4').textContent;
        
        audioPlayer.src = trackSrc;
        trackTitle.textContent = trackName;
        
        // Update active track styling
        tracks.forEach(t => t.classList.remove('active'));
        track.classList.add('active');
        
        // Update play button icon in track
        tracks.forEach(t => {
            const icon = t.querySelector('.track-play i');
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        });
        
        const activeIcon = track.querySelector('.track-play i');
        activeIcon.classList.remove('fa-play');
        activeIcon.classList.add('fa-pause');
    }

    // Play track
    function playTrack() {
        audioPlayer.play();
        isPlaying = true;
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        
        // Update play button icon in active track
        const activeTrack = document.querySelector('.track.active');
        if (activeTrack) {
            const icon = activeTrack.querySelector('.track-play i');
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
        }
    }

    // Pause track
    function pauseTrack() {
        audioPlayer.pause();
        isPlaying = false;
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        
        // Update play button icon in active track
        const activeTrack = document.querySelector('.track.active');
        if (activeTrack) {
            const icon = activeTrack.querySelector('.track-play i');
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        }
    }

    // Previous track
    function prevTrack() {
        currentTrackIndex--;
        loadTrack(currentTrackIndex);
        playTrack();
    }

    // Next track
    function nextTrack() {
        currentTrackIndex++;
        loadTrack(currentTrackIndex);
        playTrack();
    }

    // Update progress bar
    function updateProgress() {
        const { duration, currentTime } = audioPlayer;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        
        currentTimeEl.textContent = formatTime(currentTime);
        if (!isNaN(duration)) {
            durationEl.textContent = formatTime(duration);
        }
    }

    // Set progress when clicked
    function setProgress(e) {
        const progressContainer = document.querySelector('.progress-bar');
        const width = progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        audioPlayer.currentTime = (clickX / width) * duration;
    }

    // Set volume
    function setVolume() {
        audioPlayer.volume = volumeSlider.value / 100;
    }

    // Event listeners
    playBtn.addEventListener('click', function() {
        if (audioPlayer.src) {
            if (isPlaying) {
                pauseTrack();
            } else {
                playTrack();
            }
        } else if (tracks.length > 0) {
            loadTrack(0);
            playTrack();
        }
    });

    prevBtn.addEventListener('click', prevTrack);
    nextBtn.addEventListener('click', nextTrack);
    
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', nextTrack);
    
    document.querySelector('.progress-bar').addEventListener('click', setProgress);
    volumeSlider.addEventListener('input', setVolume);

    // Initialize
    initializeTracks();
    
    // Set initial volume
    setVolume();
    
    // If there are tracks, load the first one
    if (tracks.length > 0) {
        loadTrack(0);
    }
});
