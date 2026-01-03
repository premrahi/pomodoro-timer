    const timeDisplay = document.getElementById('time');
    const startButton = document.getElementById('start-btn');
    const pauseButton = document.getElementById('pause-btn');
    const resetButton = document.getElementById('reset-btn');

    const pomoBtn = document.getElementById('pomo-btn');
    const breakBtn = document.getElementById('break-btn');
    const longBreakBtn = document.getElementById('long-break-btn');

    const wallpaperImg = document.querySelector('.selected-wallpaper');
    const wallpaperBtn = document.getElementById('wallpaper-btn');

    const wallpapers = [
    'images/background-1.jpg',
    'images/background-2.jpg',
    'images/background-3.jpg',
    'images/background-4.jpg',
    'images/background-5.jpg'
    ];

    let currentWallpaper = 0;
    wallpaperBtn.addEventListener('click', () => {
    // fade slightly (not fully)
    wallpaperImg.style.opacity = '0.3';

    setTimeout(() => {
        currentWallpaper = (currentWallpaper + 1) % wallpapers.length;
        wallpaperImg.src = wallpapers[currentWallpaper];

        wallpaperImg.style.opacity = '0.7';
    }, 300);
    });


    const MODES = {
    pomodoro: 25 * 60,
    short: 5 * 60,
    long: 15 * 60
    };

    let currentMode = 'pomodoro';
    let timeLeft = MODES[currentMode];
    let interval = null;

    function updateTime() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timeDisplay.textContent =
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0');
    }

    function setActiveButton(activeBtn) {
    pomoBtn.classList.remove('active');
    breakBtn.classList.remove('active');
    longBreakBtn.classList.remove('active');

    activeBtn.classList.add('active');
    }

    function switchMode(mode) {
    clearInterval(interval);
    interval = null;

    currentMode = mode;
    timeLeft = MODES[mode];
    updateTime();

    if (mode === 'pomodoro') setActiveButton(pomoBtn);
    if (mode === 'short') setActiveButton(breakBtn);
    if (mode === 'long') setActiveButton(longBreakBtn);
    }

    startButton.addEventListener('click', () => {
    if (interval !== null) return;

    interval = setInterval(() => {
        if (timeLeft > 0) {
        timeLeft--;
        updateTime();
        } else {
        clearInterval(interval);
        interval = null;
        alert("Time's UP!");
        }
    }, 1000);
    });

    pauseButton.addEventListener('click', () => {
    clearInterval(interval);
    interval = null;
    });

    resetButton.addEventListener('click', () => {
    clearInterval(interval);
    interval = null;
    timeLeft = MODES[currentMode];
    updateTime();
    });

    pomoBtn.addEventListener('click', () => switchMode('pomodoro'));
    breakBtn.addEventListener('click', () => switchMode('short'));
    longBreakBtn.addEventListener('click', () => switchMode('long'));

    updateTime();
