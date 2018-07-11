class TaskScheduler {
	constructor(interval)  {
		this.interval = interval;
	}

	start(task) {
		setInterval(task, this.interval);
	}
}

module.exports = TaskScheduler;