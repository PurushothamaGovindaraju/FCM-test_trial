const express = require("express");
const axios = require("axios");
const vars = require("./constants/vars");
const app = express();
app.use(express.json());

const generateAccessToken = require("./helpers/fcm-authentication");

app.post("/sendNotification", async (req, res) => {
  const fcmUrl = `https://fcm.googleapis.com/v1/projects/${vars.projectId}/messages:send`;

  console.log(req.body);
  throw Error;

  try {
    // retrieving token
    const accessToken = await generateAccessToken();
    const response = await axios.post(fcmUrl, req.body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send notification.");
  }
});

const PORT = vars.port || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
