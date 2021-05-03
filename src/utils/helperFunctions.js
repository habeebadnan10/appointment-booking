const moment = require("moment-timezone");
const { config} = require("../config/index");


const timeAlreadyExist = (reqStartTime, reqEndTime, previousTimeArr) => {
  for (let i = 0; i < previousTimeArr.length; i++) {
    const prevStartEvent = moment.tz(
      previousTimeArr[i].startTime,
      config.Timezone
    );
    const prevEndEvent = prevStartEvent
      .clone()
      .add(previousTimeArr[i].duration, "minutes");

    if (
      (reqStartTime.isSameOrAfter(prevStartEvent) && reqEndTime.isSameOrBefore(prevEndEvent)) ||
      (reqStartTime.isSameOrAfter(prevStartEvent)  && reqStartTime.isSameOrBefore(prevEndEvent)) ||
      (reqEndTime.isSameOrAfter(prevStartEvent)  && reqEndTime.isSameOrBefore(prevEndEvent))
    ) {
      return true;
    }
  }
  return false;
};

const eventExist = (currentDateTime, existingTime) => {
  for (let i = 0; i < existingTime.length; i++) {
    const prevStartEvent = moment(existingTime[i].startTime);
    const prevEndEvent = moment(existingTime[i].endTime);

    if (
      (currentDateTime.isSameOrAfter(prevStartEvent) &&
        currentDateTime.isBefore(prevEndEvent)) ||
      (currentDateTime.clone().add(30, "minutes").isAfter(prevStartEvent) &&
        currentDateTime.clone().add(30, "minutes").isSameOrBefore(prevEndEvent))
    )
      return true;
  }
  return false;
};

const getFreeTimeSlots = ( existingTime, j, reqDate, timezone) => {
  let slots = [];

  for (
    let i = moment(config.StartHours, "HH:mm");
    i.isBefore(moment(config.EndHours, "HH:mm"));
    i = i.add(config.Duration, "minutes")
  ) {
    const currentDateTime = moment({
      year: j.year(),
      month: j.month(),
      day: j.date(),
      hour: i.hour(),
      minute: i.minutes(),
    });

    if (!eventExist(currentDateTime, existingTime)) {
      const currentTimeZone = moment.tz(
        currentDateTime.format("YYYY-MM-DD HH:mm"),
        config.Timezone
      );

      const requestedTimeDate = currentTimeZone.clone().tz(timezone);

      if (reqDate.date() === requestedTimeDate.date()) {
        slots.push(requestedTimeDate.format("YYYY-MM-DD hh:mm A"));
      }
    }
  }
  return slots;
};

const getDates = (reqDate, zoneDate) => {
  let startDate, endDate;
  if (reqDate.isAfter(zoneDate)) {
    startDate = zoneDate.clone().subtract(1, "days");
    endDate = zoneDate.clone().add(1, "days");
  } else {
    startDate = zoneDate.clone();
    endDate = zoneDate.clone().add(1, "days");
  }
  return [startDate, endDate];
};

module.exports = {
  getFreeTimeSlots,
  getDates,
  timeAlreadyExist,
};
