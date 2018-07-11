const BIM360ServiceResponseParser = require("../../../../src/models/sampler/parsers/BIM360Service");

test("Convert response with bad health into a Sample", async () => {
	const mockedResponse = {
		service: "mock",
		environment: "test",
		status: {
			overall: "BAD"
		}
	};

	const sample = await new BIM360ServiceResponseParser().toSample([mockedResponse, Date.now()]);
	expect(sample.avaliable).toBeFalsy();
});

test("Convert response with good health into a Sample", async () => {
	const mockedResponse = {
		service: "mock",
		environment: "test",
		status: {
			overall: "GOOD"
		}
	};

	const sample = await new BIM360ServiceResponseParser().toSample([mockedResponse, Date.now()]);
	expect(sample.avaliable).toBeTruthy();
});
