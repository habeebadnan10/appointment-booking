const express = require("express");
const router = express.Router();
const moment = require("moment-timezone");
const { db } = require("../../config");

const eventRef = db.collection("events");

router.post("/", async (req, res) => {

 if (req.body.startdate === undefined || req.body.enddate === undefined) {
    res.sendStatus(422);
    return;
  }
  let startDate = moment(req.body.startdate);
  let endDate = moment(req.body.enddate);

  if (
    !moment(startDate, "YYYY-MM-DD", true).isValid() ||
    !moment(endDate, "YYYY-MM-DD", true).isValid()
  ) {
    res.status(422).send("Invalid Date. Please use this format 2021-05-04");
    return;
  }

  let eventsBooked = [];
  for (let i = startDate.clone(); i <= endDate.clone(); i = i.add(1, "days")) {
    const date = i.format("YYYY-M-D");
    const result = await eventRef.doc(date).collection("timeSlots").get();

    let existingTime = [];
    if (result.docs.length !== 0) {
      existingTime = result.docs.map((res) => {
        return res.data();
      });
    }

    const obj = {
      date: date,
      events: existingTime,
    };
    eventsBooked.push(obj);
  }
  res.send({ events: eventsBooked });
});


module.exports = router;