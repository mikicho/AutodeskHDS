const SamplerManager = require("../src/SamplerManager");
const Sample = require("../src/models/Sample");

test("Get current health", () => {
	const mockHealthData = {
		"service1": [new Sample(Date.now(), true)],
		"service2": [new Sample(Date.now(), false)],
		"service3": []
	};

	expect(SamplerManager.getHealth(mockHealthData))
	.toMatchObject({
		"service1": true,
		"service2": false,
		"service3": "N/A"
	});
});

test("Calculate last hour avarage availability", () => {
	const mockHealthDate = {
		"service1": [new Sample(Date.now(), true), new Sample(Date.now(), true)],
		"service2": [new Sample(Date.now(), true), new Sample(Date.now(), false)],
		"service3": [new Sample(Date.now(), false)],
		"service4": []
	};

	expect(SamplerManager.getLastHourAvgAvailability(mockHealthDate))
	.toMatchObject({
		"service1": "100%",
		"service2": "50%",
		"service3": "0%",
		"service4": "N/A"
	})
});