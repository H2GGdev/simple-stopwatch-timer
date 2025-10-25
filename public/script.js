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

	function formatParts(ms) {
		const total = Math.floor(ms / 1000);
		const hours = Math.floor(total / 3600);
		const minutes = Math.floor((total % 3600) / 60);
		const seconds = total % 60;
		const centis = Math.floor((ms % 1000) / 10);
		return {
			main: `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`,
			cs: String(centis).padStart(2, '0')
		};
	}

	function render() {
		const parts = formatParts(elapsed);
		display.setAttribute('aria-label', `${parts.main}.${parts.cs}`);
		display.innerHTML = `${parts.main}.<span class="cs">${parts.cs}</span>`;
	}

	function tick() {
		elapsed = Date.now() - startTime;
		render();
	}

	function start() {
		if (running) return;
		startTime = Date.now() - elapsed;
		timerId = setInterval(tick, 10);
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

	// theme toggle: init and handler
	const themeToggle = document.getElementById('themeToggle');

	function applyTheme(theme, persist = true) {
		document.documentElement.setAttribute('data-theme', theme);
		if (themeToggle) {
			themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
			themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
		}
		// small animation: add class then remove
		document.documentElement.classList.add('theme-flash');
		setTimeout(() => document.documentElement.classList.remove('theme-flash'), 520);
		if (persist) localStorage.setItem('theme', theme);
	}

	function initTheme() {
		const saved = localStorage.getItem('theme');
		const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
		const theme = saved || (prefersDark ? 'dark' : 'light');
		applyTheme(theme, false);
	}

	if (themeToggle) {
		themeToggle.addEventListener('click', () => {
			const current = document.documentElement.getAttribute('data-theme') || 'dark';
			const next = current === 'dark' ? 'light' : 'dark';
			applyTheme(next, true);
		});
	}

	// keyboard shortcut: T toggles theme
	document.addEventListener('keydown', (e) => {
		if (e.key.toLowerCase() === 't' && !(e.ctrlKey || e.metaKey || e.altKey)) {
			const current = document.documentElement.getAttribute('data-theme') || 'dark';
			const next = current === 'dark' ? 'light' : 'dark';
			applyTheme(next, true);
		}
	});

	initTheme();

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

