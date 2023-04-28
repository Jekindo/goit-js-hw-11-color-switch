const INTERVAL_DELAY = 1000;
const colors = ['#FFFFFF', '#2196F3', '#4CAF50', '#FF9800', '#009688', '#795548'];
const refs = {
	startBtn: document.querySelector('[data-action="start"]'),
	stopBtn: document.querySelector('[data-action="stop"]'),
};

let intervalId = null;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
	refs.startBtn.disabled = true;

	intervalId = setInterval(() => {
		const index = randomIntegerFromInterval(0, colors.length - 1);
		document.body.style.backgroundColor = colors[index];
	}, INTERVAL_DELAY);
}

function onStopBtnClick() {
	refs.startBtn.disabled = false;

	clearInterval(intervalId);
}

function randomIntegerFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
