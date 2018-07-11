const Sample = require("../../Sample");
var _ = require('lodash');

class BIM360Service {
	toSample([response, timestamp]) {
		if (_.has(response, "status.overall")) {
			return Promise.resolve(new Sample(timestamp, response.status.overall == "GOOD"));
		} else {
			throw new Error("Incorrect structure");
		}
	}
}

module.exports = BIM360Service;