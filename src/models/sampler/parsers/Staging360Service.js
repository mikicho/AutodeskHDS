const Sample = require("../../Sample");
const util = require('util');
const parseString = util.promisify(require('xml2js').parseString);

class Staging360Service {
	toSample([response, timestamp]) {
		return parseString(response)
			.then(result => {
				return new Sample(timestamp, result.HealthCheck.status[0] == "Good");
			});
	}
}

module.exports = Staging360Service;