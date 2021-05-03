const express = require("express");
const router = express.Router();
const moment = require("moment-timezone");
const { config, db } = require("../../config/index");

const { getFreeTimeSlots, getDates } = require("../../utils/helperFunctions");

const eventRef = db.collection("events");

router.post("/", async (req, res) => {

  console.log(req.body);
  const timezone = req.body.timezone;
  if (
    req.body.date === undefined ||
    timezone === undefined ||
    timezone.trim() === ""
  ) {
    res.sendStatus(422);
    return;
  }

  let date = moment(req.body.date);
  if (!moment(date, "YYYY-MM-DD", true).isValid()) {
    res.status(422).send("Invalid Date. Please use this format 2021-05-04");
    return;
  }

  let userDate = moment.tz(req.body.date, timezone);
  let zoneDate = userDate.clone().tz(config.Timezone);

  const [startDate, endDate] = getDates(userDate, zoneDate);

  let availableTimeSlot = [];
  for (let dt = startDate.clone(); dt <= endDate.clone(); dt.add(1, "days")) {
    const dateStr = dt.format("YYYY-M-D");
    const result = await eventRef.doc(dateStr).collection("timeSlots").get();

    let existingTime = [];

    if (result.docs.length !== 0) {
      existingTime = result.docs.map((res) => {
        return res.data();
      });
    }

    availableTimeSlot.push(
      ...getFreeTimeSlots(existingTime, dt, userDate, timezone)
    );

    console.log(availableTimeSlot.length, "availableTimeSlot length");
  }

  res.send({ FreeSlots: availableTimeSlot });
});

module.exports = router;
