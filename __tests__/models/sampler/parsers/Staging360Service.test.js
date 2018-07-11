const Staging360ServiceResponseParser = require("../../../../src/models/sampler/parsers/Staging360Service");

test("Convert response with bad health into a Sample", async () => {
	const mockedResponse = `<?xml version="1.0" encoding="UTF-8"?>
		<HealthCheck service="my" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
		<fireflyViewableFileFormats>dwg,dwf,dwfx,f3d,ipt,sim,obj,idw,iam,vtfx,sim360,ipb,afe,atf,afem,wire,catpart,igs,iges,prt,x_t,x_b,3dm,sat,stp,sldprt,prt,neu,sldasm,ste,step,asm,ige,smt,sab,smb,catproduct,dwt,stl,instructionx,3ds,dae,afef,mfr</fireflyViewableFileFormats>
		<exception/>
		<status>Bad</status>
		<date>2018-07-11T10:02:12.2510661+00:00</date>
		<build>2018.2.130</build>
		</HealthCheck>`;

	const sample = await new Staging360ServiceResponseParser().toSample([mockedResponse, Date.now()]);
	expect(sample.avaliable).toBeFalsy();
});

test("Convert response with good health into a Sample", async () => {
	const mockedResponse = `<?xml version="1.0" encoding="UTF-8"?>
		<HealthCheck service="my" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
		<fireflyViewableFileFormats>dwg,dwf,dwfx,f3d,ipt,sim,obj,idw,iam,vtfx,sim360,ipb,afe,atf,afem,wire,catpart,igs,iges,prt,x_t,x_b,3dm,sat,stp,sldprt,prt,neu,sldasm,ste,step,asm,ige,smt,sab,smb,catproduct,dwt,stl,instructionx,3ds,dae,afef,mfr</fireflyViewableFileFormats>
		<exception/>
		<status>Good</status>
		<date>2018-07-11T10:02:12.2510661+00:00</date>
		<build>2018.2.130</build>
		</HealthCheck>`;

	const sample = await new Staging360ServiceResponseParser().toSample([mockedResponse, Date.now()]);
	expect(sample.avaliable).toBeTruthy();
});
