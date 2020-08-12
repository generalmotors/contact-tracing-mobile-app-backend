const express = require("express");
const app = express();
const pool = require("./database");
const phoneModels = require("./phone_model.json")
const distanceProfile = require("./distance_profile.json")
const {
  check,
  validationResult
} = require("express-validator");

const isBase64 = require('is-base64');

//value we are checking in header for existence
const CT_KEY = process.env.CT_KEY || ''

app.use(express.json());


//record calibration information at 6 feet
app.post("/api/v1/interaction_calibration", [
  check('device_model', 'device_model is required').not().isEmpty().trim().escape(),
  check('contact_device_model', 'contect_device_model is required').not().isEmpty().trim().escape(),
  check('distance_detected', 'distance_detected is required').not().isEmpty().trim().escape()
], async (req, res) => {
  try {

    if (!isValidHeader(req)) {
      return res.status(401).send();
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const {
      device_model,
      contact_device_model,
      distance_detected
    } = req.body;
    let calibrationInfo;
    try {
      calibrationInfo = await pool.query("INSERT INTO interaction_calibration (device_model, contact_device_model, distance_detected, created_at) VALUES($1, $2, $3, CURRENT_TIMESTAMP(6)) RETURNING *",
        [device_model, contact_device_model, distance_detected]);
    } catch (error) {
      return res.status(500).send();
    }
    res.json(calibrationInfo.rows[0])

  } catch (error) {
    console.error(error.message);
  }
})

//register contacts + phone numbers
app.post("/api/v1/contact_registration", [
  check('phone_number', 'phone_number is required').not().isEmpty().trim().escape(),
  check('registration_time', 'registration_time is required').not().isEmpty().trim().escape(),
  check('is_primary', 'is_primary is required').not().isEmpty().trim().escape()
], async (req, res) => {
  try {

    if (!isValidHeader(req)) {
      return res.status(401).send();
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const {
      phone_number,
      registration_time,
      is_primary
    } = req.body;
    let newContactRegistration;
    try {
      newContactRegistration = await pool.query("INSERT INTO contact_registration (phoneNumber, registration_time, is_primary, created_at, updated_at) VALUES($1, $2, $3, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6)) RETURNING *",
        [phone_number, registration_time, is_primary]);
    } catch (error) {
      return res.status(500).send();
    }
    res.json(newContactRegistration.rows[0])

  } catch (error) {
    console.error(error.message);
  }
})

//add beacon report
app.post("/api/v1/beacon_report", [
  check('beacon_id', 'beacon_id is required').not().isEmpty().trim().escape(),
  check('tcn_base64', 'tcn_base64 is required').not().isEmpty(),
], async (req, res) => {
  try {

    if (!isValidHeader(req)) {
      return res.status(401).send();
    }
    if(!isBase64(req.body.tcn_base64)) {
      return res.status(500).send();
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const {
      beacon_id,
      tcn_base64
    } = req.body;
    let newBeaconReport;
    try {
      newBeaconReport = await pool.query("INSERT INTO beacon_report (beacon_id, tcn_base64, created_at, updated_at) VALUES($1, $2, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6)) ON CONFLICT ON CONSTRAINT beacon_report_pkey DO UPDATE SET updated_at=CURRENT_TIMESTAMP(6), tcn_base64=$2 RETURNING *",
        [beacon_id, tcn_base64]);
    } catch (error) {
      return res.status(500).send();
    }
    res.json(newBeaconReport.rows[0])

  } catch (error) {
    console.error(error.message);
  }
})

//get a beacon report
app.get("/api/v1/beacon_report/:beacon_id", async (req, res) => {
  try {
    if (!isValidHeader(req)) {
      return res.status(401).send();
    }
    const {
      beacon_id
    } = req.params;
    let beacon_report;
    try {
      beacon_report = await pool.query("SELECT * FROM beacon_report WHERE beacon_id = $1", [beacon_id]);
    } catch (error) {
      return res.status(500).send();
    }
    if (beacon_report.rows[0]) {
      return res.json(beacon_report.rows[0]);
    }
    return res.status(404).send();

  } catch (err) {
    console.error(err.message);
  }
})

//retrieve phone models list
app.get("/api/v1/phone_models", async (req, res) => {
  if (!isValidHeader(req)) {
    return res.status(401).send();
  }
  return res.json(phoneModels);
});

//retrieve distance profile for device-to-device interactions base on devices' ids
app.get("/api/v1/phone_profile/:id", async (req, res) => {
  if (!isValidHeader(req)) {
    return res.status(401).send();
  }
  let phoneId = req.params.id;
  if (distanceProfile[phoneId]) {
    return res.json(distanceProfile[phoneId]);
  }
  return res.status(404).send();
})

var port = process.env.PORT || 5000
app.listen(port, () => {
  console.log("server has started on port %d", port);
})

function isValidHeader(req) {
  //fix issue where + symbol replaced with space
  let headerValue = req.get('CT_KEY');
  if (!headerValue) {
    return false;
  }
  if (headerValue !== CT_KEY) {
    return false;
  }
  return true;
}

const jsonErrorHandler = async (err, req, res, next) => {
  res.status(500).send({
    error: err
  });
}

app.use(async function (req, res) {
  res.status(404).send();
});
app.use(jsonErrorHandler)