# Contact Tracing Service

## What is this app?

This application is the back-end component of a contact tracing system. This simple NodeJS Postgres service is for storing beacon registration information and phone numbers of users who have reported they tested positive via the mobile app. The Contact Tracing app for both iOS and Android use this backend functionality. 

- Android Mobile App: https://github.com/generalmotors/covidwatch-android-tcn
- iOS Mobile App: https://github.com/generalmotors/covidwatch-ios-tcn

### iBeacon Registration
1.	Beacon Registration Endpoint - to register Beacon Identifier with TCN
2.	Beacon TCN Retrieval Endpoint - to retrieve TCN based on Beacon Identifier
### User Contact Registration
1.	User Contact Endpoint - to post user's number on Covid-19 potentially infectious report

## Setup

1. Clone this repo from the `master` branch:
2. Install [nodejs](https://nodejs.org/en/)
3. Install and configure [postgres](https://www.postgresql.org/)
4. Configure Postgres connection to your database in `database.js`
5. Create tables using script file `database.sql`
6. Run the app
```
npm install
```
```
node index.js
```

## Contributors

- Shane McCutchen
- Dan Rudman (@dantelope)
- Naveen Sankar (@naveenatgm)
- Sukhdev Tur 
- Jonathan Wilson
- Joshua Noble (@joshuanoble)
- Zane Schepke (@zaneschepke)
- Mike Schuplin 

