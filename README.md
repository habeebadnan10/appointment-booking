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
Example Response :
```javascript
{
    "FreeSlots": [
        "2021-05-04 08:00 AM",
        "2021-05-04 09:00 AM",
        "2021-05-04 09:30 AM",
        "2021-05-04 10:00 AM",
        "2021-05-04 11:00 AM",
        "2021-05-04 12:00 PM",
        "2021-05-04 12:30 PM",
        "2021-05-04 01:00 PM",
        "2021-05-04 01:30 PM",
        "2021-05-04 03:00 PM",
        "2021-05-04 03:30 PM",
        "2021-05-04 04:00 PM",
        "2021-05-04 04:30 PM"
    ]
}
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

Example Response :
```javascript
{
    "events": [
        {
            "date": "2021-5-3",
            "events": [
                {
                    "endTime": "2021-05-03T12:00",
                    "startTime": "2021-05-03T11:30",
                    "duration": 30
                }
            ]
        },
        {
            "date": "2021-5-4",
            "events": [
                {
                    "startTime": "2021-05-04T08:30",
                    "duration": 30,
                    "endTime": "2021-05-04T09:00"
                },
                {
                    "duration": 30,
                    "startTime": "2021-05-04T10:30",
                    "endTime": "2021-05-04T11:00"
                },
                {
                    "endTime": "2021-05-04T12:00",
                    "startTime": "2021-05-04T11:30",
                    "duration": 30
                },
                {
                    "startTime": "2021-05-04T14:00",
                    "duration": 50,
                    "endTime": "2021-05-04T14:50"
                }
            ]
        }
    ]
}
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

Example Respone :

```javascript
Event Created from 2021-05-02T10:30 to 2021-05-02T11:00 in Dr. John's Calendar(Tz : US/Eastern)
```
## Database Structure - FireStore

event (Collection) --> Date (Document) --> TimeSlots (Collection) --> Time (Document)


