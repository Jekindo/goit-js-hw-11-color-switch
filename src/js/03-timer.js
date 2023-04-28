class CountdownTimer {
	constructor({ selector, targetDate }) {
		this.timerRef = document.querySelector(selector);
		this.targetDate = targetDate;
		this.intervalId = null;

		this.start();
	}

	start() {
		this.intervalId = setInterval(() => {
			const currentTime = Date.now();
			const remainingTime = this.targetDate - currentTime;
			const timeComponents = this.getTimeComponents(remainingTime);

			if (remainingTime < 1) {
				this.stop();
				return;
			}

			this.updateClockFace(timeComponents);
		}, 1000);
	}

	stop() {
		clearInterval(this.intervalId);

		const timeComponents = this.getTimeComponents(0);

		this.updateClockFace(timeComponents);
	}

	updateClockFace(timeComponents) {
		const keys = Object.keys(timeComponents);

		for (const key of keys) {
			const span = this.timerRef.querySelector(`[data-value=${key}]`);

			span.textContent = timeComponents[key];
		}
	}

	pad(value) {
		return String(value).padStart(2, '0');
	}

	getTimeComponents(time) {
		const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
		const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
		const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
		const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

		return { days, hours, mins, secs };
	}
}

new CountdownTimer({
	selector: '#timer-1',
	targetDate: new Date('Jul 17, 2023'),
});

