# GHL Appointment Booking
Created simple APIs for creating events, checking free time slots on specific dates and getting events.

Hosted Link Here: [Appointment-Booking-App-Backend](https://ghl-appointment-booking.herokuapp.com)

## Getting Started

**Installing**

Steps to run the app

```
git clone https://github.com/habeebadnan10/appointment-booking.git
cd appointmentbooking/
npm install
npm start
```

Runs the app in the development mode.
Open http://localhost:4000 to view it in the browser.

Test the app using Postman.

## API End Points

**FreeSlots**

Get the list of available slots of Mr. John.

```javascript
curl --location --request POST 'https://ghl-appointment-booking.herokuapp.com/api/freeSlots' \
--header 'Content-Type: application/json' \
--data-raw '{
    "date": "2021-05-04",
    "timezone": "US/Eastern"
}'
```

**Get Events**

Get events of Mr. John on specific dates.

```javascript
curl --location --request POST 'https://ghl-appointment-booking.herokuapp.com/api/getEvents' \
--header 'Content-Type: application/json' \
--data-raw '{
    "startdate": "2021-05-03",
    "enddate": "2021-05-04"
}'
```

**Create Event**

Create events/ Schedule appointment with Dr. John's. 

```javascript
curl --location --request POST 'https://ghl-appointment-booking.herokuapp.com/api/createEvent' \
--header 'Content-Type: application/json' \
--data-raw '{
    "datetime": "2021-05-02T21:00:00",
    "duration": 30,
    "timezone": "Asia/Kolkata"
}'
```
## Database Structure

event (Collection) --> Date (Document) --> TimeSlots (Collection) --> Time (Document)


