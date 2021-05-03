const admin = require("firebase-admin");
const serviceAccount = require("../utils/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = {
  db,
  config: {
    StartHours: "08:00",
    EndHours: "17:00",
    Duration: 30,
    Timezone: "US/Eastern",
  },
};
