# AutodeskHDS

## How to run
```
git clone git@github.com:mikicho/AutodeskHDS.git
cd AutodeskHDS
npm install
node server.js
```
## Notes
In this task I focused mainly on 3 points:
1. Flexible code and design. For example, it's easy to add a new service to the dashboard.
2. Readability
3. Do the samples asynchronous and make sure they are not dependent on each other.  

Besides, I tried to handle variant errors, for example, one of the health endpoints is down.

I chose to focus on what seems to be the main parts of the task, for example, I'm using `setInterval(...);` to schedule samples and neglect the possibility that the previous sample didn't end yet (both work, but maybe if the request is not done we shouldn't create another sample for this service)

## API
### Get current services' health
```GET localhost:3000/api/health``` 
```
{
    "commands.bim360dm-dev.autodesk.com": true,
    "360-staging.autodesk.com": true,
    "bim360dm-dev.autodesk.com": true
}
```

### Get services average last hour availability
```GET localhost:3000/api/health/avg``` 
```
{
    "commands.bim360dm-dev.autodesk.com": "100%",
    "360-staging.autodesk.com": "100%",
    "bim360dm-dev.autodesk.com": "100%"
}
```
