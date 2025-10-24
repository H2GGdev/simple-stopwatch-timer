(function () {
	const display = document.getElementById('stopwatch');
	const startBtn = document.getElementById('startBtn');
	const stopBtn = document.getElementById('stopBtn');
	const resetBtn = document.getElementById('resetBtn');

	let startTime = 0;
	let elapsed = 0;
	let timerId = null;
	let running = false;

	function pad(n) {
		return String(n).padStart(2, '0');
	}

	// return parts so we can style centiseconds separately
	function formatParts(ms) {
		const total = Math.floor(ms / 1000);
		const hours = Math.floor(total / 3600);
		const minutes = Math.floor((total % 3600) / 60);
		const seconds = total % 60;
		// centiseconds (2 digits) = floor((ms % 1000) / 10)
		const centis = Math.floor((ms % 1000) / 10);
		return {
			main: `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`,
			cs: String(centis).padStart(2, '0')
		};
	}

	function render() {
		const parts = formatParts(elapsed);
		// set aria-label for assistive tech
		display.setAttribute('aria-label', `${parts.main}.${parts.cs}`);
		// inject span for centiseconds so we can style it smaller/transparent
		display.innerHTML = `${parts.main}.<span class="cs">${parts.cs}</span>`;
	}

	function tick() {
		elapsed = Date.now() - startTime;
		render();
	}

	function start() {
		if (running) return;
		startTime = Date.now() - elapsed;
		timerId = setInterval(tick, 10); // update every 10ms so milliseconds render smoothly
		running = true;
		startBtn.textContent = 'Pause';
		startBtn.classList.add('active');
		startBtn.setAttribute('aria-pressed', 'true');
		stopBtn.disabled = false;
	}

	function pause() {
		if (!running) return;
		clearInterval(timerId);
		running = false;
		startBtn.textContent = 'Start';
		startBtn.classList.remove('active');
		startBtn.setAttribute('aria-pressed', 'false');
	}

	function stop() {
		pause();
		stopBtn.disabled = true;
	}

	function reset() {
		clearInterval(timerId);
		running = false;
		elapsed = 0;
		render();
		startBtn.textContent = 'Start';
		startBtn.classList.remove('active');
		startBtn.setAttribute('aria-pressed', 'false');
		stopBtn.disabled = true;
	}

	startBtn.addEventListener('click', () => {
		if (!running) start(); else pause();
	});
	stopBtn.addEventListener('click', stop);
	resetBtn.addEventListener('click', reset);

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Space') {
			e.preventDefault();
			if (!running) start(); else pause();
		} else if (e.key.toLowerCase() === 'r') {
			reset();
		} else if (e.key.toLowerCase() === 's') {
			stop();
		}
	});

	render();
	stopBtn.disabled = true;
})();

