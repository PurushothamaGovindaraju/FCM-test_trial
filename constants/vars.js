require("dotenv").config();

const vars = {
  projectId: process.env.PROJECT_ID,
  port: process.env.PORT,
};

module.exports = vars;
