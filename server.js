// Import necessary modules
const express = require("express");
const admin = require("firebase-admin");
const vars = require("./constants/vars");

const app = express();
app.use(express.json());

// Initialize Firebase Admin SDK
const serviceAccount = require("./fcm-testing-trial.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const messaging = admin.messaging();

// Route to send a message
app.post("/sendNotification", (req, res) => {
  const message = {
    data: {
      score: "850",
      time: "2:45",
    },
    topic: "GurinTest",
  };

  messaging
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
      res.send("Message sent successfully");
    })
    .catch((error) => {
      console.error("Error sending message:", error);
      res.status(500).send("Error sending message");
    });
});

const PORT = vars.port || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
