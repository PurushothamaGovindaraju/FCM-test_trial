const { GoogleAuth } = require("google-auth-library");
const fs = require("fs");

async function generateAccessToken() {
  return new Promise((resolve, reject) => {
    const filePath = path.resolve(__dirname, "./fcm-testing-trial.json");

    console.log(filePath);

    fs.readFile(filePath, "utf8", async (err, data) => {
      if (err) {
        console.error("Error reading service account file:", err);
        reject(err);
        return;
      }

      try {
        const jsonKeys = JSON.parse(data);

        const auth = new GoogleAuth({
          credentials: jsonKeys,
          scopes: ["https://www.googleapis.com/auth/cloud-platform"],
        });

        const client = await auth.getClient();
        const accessToken = (await client.getAccessToken()).token;

        resolve(accessToken);
      } catch (error) {
        console.error("Error parsing service account JSON:", error);
        reject(error);
      }
    });
  });
}

module.exports = generateAccessToken;
