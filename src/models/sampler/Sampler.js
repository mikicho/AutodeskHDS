const axios = require("axios");
const url = require('url'); 
const Sample = require("../../models/Sample");

class Sampler {
	constructor(healthUrl, parser) {
		this.healthUrl = url.parse(healthUrl);
		this.parser = parser;
	}

	getTargetHost() {
		return this.healthUrl.host;
	}

	sample() {
		return this.getServiceHealthData()
			.then(response => {
				return [response, Date.now()]
			})
			.then(this.parser.toSample)
			.catch(error => {
				console.log(error);
				return new Sample(Date.now(), false);
			});
	}

	getServiceHealthData() {
		return axios.get(this.healthUrl.href)
			.then(response => {
				return response.data;
			})
	}
}

module.exports = Sampler;