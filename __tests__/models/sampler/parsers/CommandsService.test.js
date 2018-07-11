const CommandServiceResponseParser = require("../../../../src/models/sampler/parsers/CommandsService");

test("Convert response with bad health into a Sample", async () => {
	const mockedResponse = {
		service: "mock",
		environment: "test",
		status: {
			overall: "BAD"
		}
	};

	const sample = await new CommandServiceResponseParser().toSample([mockedResponse, Date.now()]);
	expect(sample.avaliable).toBeFalsy();
});

test("Convert response with good health into a Sample", async () => {
	const mockedResponse = {
		service: "mock",
		environment: "test",
		status: {
			overall: "OK"
		}
	};

	const sample = await new CommandServiceResponseParser().toSample([mockedResponse, Date.now()]);
	expect(sample.avaliable).toBeTruthy();
});
