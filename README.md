[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

# Contact Tracing Service

## What is this app?

Simple Nodejs, Express, and Postgres service for storing beacon registration information and phone numbers of users who have reported they tested positive via the mobile app. 

Additional functionality includes:

1. Retrieval of devices models and their associated ids that are shared via ble manufacturing data on the phones (currently static file phone_model.json)
2. Storing of posted calibration data sent by mobile app users when physically 7ft from a detected device
3. Customizable device model-to-model distance profiling based on posted calibration data (currently static file distance_profile.json)

 The Contact Tracing app for both [iOS](https://github.com/generalmotors/covidwatch-ios-tcn) and [Android](https://github.com/generalmotors/covidwatch-android-tcn) use this back end to properly function.

## Setup

1. Clone this repo from the `master` branch:
2. Install [nodejs](https://nodejs.org/)
3. Install and configure [postgres](https://www.postgresql.org/)
4. Configure Postgres connection to your database in `database.js`
5. Create tables using queries in file `database.sql`
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

