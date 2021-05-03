const express = require("express");
const app = express();

const freeSlots = require("./api/routes/freeSlots");
const getEvents = require("./api/routes/getEvents");
const createEvent = require("./api/routes/createEvent");

const cors = require("cors");
app.use(express.json());
app.use(cors());

// basic route for testing
app.get("/", (req, res) => {
  res.send("GHL Appointment Booking.");
});

// Routes to be handled
app.use("/api/freeSlots",freeSlots);
app.use("/api/getEvents",getEvents);
app.use("/api/createEvent",createEvent);


app.use((req, res, next) => {
  const error = new Error("The requested URL is not found");
  error.status = 404;
  next(error);
});


app.listen(process.env.PORT || 4000, () => console.log("App Started"));
