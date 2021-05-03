const express = require("express");
const router = express.Router();
const moment = require("moment-timezone");
const { config, db } = require("../../config/index");

const { timeAlreadyExist } = require("../../utils/helperFunctions");

const eventRef = db.collection("events");

router.post("/", async (req, res) => {
  console.log(req.body);
  const timezone = req.body.timezone;
  if (
    req.body.datetime === undefined ||
    timezone === undefined ||
    timezone.trim() === ""
  ) {
    res.sendStatus(422);
    return;
  }
  const dur = +req.body.duration;
  let datetime = moment(req.body.datetime);
  if (!moment(datetime, "YYYY-MM-DD", true).isValid()) {
    res.status(422).send("Invalid Date.  Please use this format 2021-05-04");
    return;
  }

  const reqDT = moment.tz(req.body.datetime, timezone);

  const zoneDT = reqDT.clone().tz(config.Timezone);
  datetime = zoneDT.clone();

  const minutesOfDay = (m) => m.minutes() + m.hours() * 60;

  if (!(minutesOfDay(datetime) < minutesOfDay(moment(config.EndHours, "HH:mm"))) ||
    !(minutesOfDay(datetime) >= minutesOfDay(moment(config.StartHours, "HH:mm")))
    ) {
    res.status(422).send("Time is Greater/Lower than the appointment time");
    return;
  }

  const date = datetime.format("YYYY-M-D");

  let flag = false;
  const result = await eventRef.doc(date).collection("timeSlots").get();

  flag = result.docs.length === 0;

  if (flag) {
    const docRef = eventRef.doc(date).collection("timeSlots");
  
      const startTime = datetime.format("YYYY-MM-DDTHH:mm");
      const endTime = datetime
        .add(dur, "minutes")
        .format("YYYY-MM-DDTHH:mm");

      docRef
        .doc(startTime)
        .set({
          duration: dur,
          endTime,
          startTime,
        })
        .then(() => console.log("Saved"));
    res.send(`Event Created from ${startTime} to ${endTime} in Dr. John's Calendar(Tz : ${config.Timezone})`);

  } else {
    const previousEvents = result.docs.map((res) => {
      return res.data();
    });

    if (timeAlreadyExist(datetime, datetime.clone().add(dur, "minutes"), previousEvents)) {
      res
        .status(422)
        .send("TimeSlot is not available. Please select another slot.");
      return;
    }

    const docRef = eventRef.doc(date).collection("timeSlots");
    
      const startTime = datetime.format("YYYY-MM-DDTHH:mm");
      const endTime = datetime
        .add(dur, "minutes")
        .format("YYYY-MM-DDTHH:mm");

      docRef
        .doc(startTime)
        .set({
          duration: dur,
          endTime,
          startTime,
        })
        .then(() => console.log("Saved"));
   
   res.send(`Event Created from ${startTime} to ${endTime} in Dr. John's Calendar(Tz : ${config.Timezone})`);
  }

});

module.exports = router;
