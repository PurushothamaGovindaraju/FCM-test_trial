const { GoogleAuth } = require("google-auth-library");

const jsonKeys = require("../fcm-testing-trial.json");

async function generateAccessToken() {
  const auth = new GoogleAuth({
    credentials: jsonKeys,
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });

  const client = await auth.getClient();
  const accessToken = (await client.getAccessToken()).token;

  return accessToken;
}

module.exports = generateAccessToken;
