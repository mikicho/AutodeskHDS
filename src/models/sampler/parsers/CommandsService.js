const Sample = require("../../Sample");
var _ = require('lodash');

class CommandsService {
	toSample([response, timestamp]) {
		if (_.has(response, "status.overall")) {
			return Promise.resolve(new Sample(timestamp, response.status.overall == "OK"));
		} else {
			throw new Error("Incorrect structure");
		}
	}
}

module.exports = CommandsService;