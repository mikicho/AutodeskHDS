const { db } = require("./util/Db");
const Sampler = require("./models/sampler/Sampler");

class SamplerManager {
	constructor()  {
		this.samplers = [];
	}

	addSampler(url, parser) {
		var sampler = new Sampler(url, parser);
		this.samplers.push(sampler);
		db[sampler.getTargetHost()] = [];
	}

	sampleAll() {
		this.samplers.forEach(sampler => {
			sampler.sample().then(sample => {
				db[sampler.getTargetHost()].push(sample);
			});
		});
	}

	static getHealth(serviceHealthData) {
		return Object.keys(serviceHealthData).reduce((accumulator, host) => {
			var samples = serviceHealthData[host];
			accumulator[host] =  samples.length > 0 ? samples[samples.length - 1].avaliable : "N/A";
			return accumulator;
		}, {});
	}

	static getLastHourAvgAvailability(serviceHealthData, maxSamples = 60) {
		var healthStatus = {};

		for (const serviceKey in serviceHealthData) {
			if (serviceHealthData.hasOwnProperty(serviceKey)) {
				const lastSamples = serviceHealthData[serviceKey].slice(-maxSamples);
	
				if (lastSamples.length > 0) {
					var availability = lastSamples.reduce((accumulator, sample) => {
						return accumulator + (sample.avaliable ? 1 : 0);
					}, 0);
					
					healthStatus[serviceKey] = availability / lastSamples.length * 100 + "%";
				} else {
					healthStatus[serviceKey] = "N/A";
				}
			}
		}

		return healthStatus;
	}

	/**
	 * This function just initialize the samplers and in production code probably it will look different.
	 */
	initialize() {
		const CommandsServiceResponseParser = require("./models/sampler/parsers/CommandsService");
		const Staging360ServiceResponseParser = require("./models/sampler/parsers/Staging360Service");
		const BIM360ServiceResponseParser = require("./models/sampler/parsers/BIM360Service");

		this.addSampler("https://commands.bim360dm-dev.autodesk.com/health", new CommandsServiceResponseParser());
		this.addSampler("https://360-staging.autodesk.com/health", new Staging360ServiceResponseParser());
		this.addSampler("https://bim360dm-dev.autodesk.com/health?self=true", new BIM360ServiceResponseParser());
	}
}

module.exports = SamplerManager;