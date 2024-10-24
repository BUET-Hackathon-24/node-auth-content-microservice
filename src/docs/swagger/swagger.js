const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "AI Mentor API Documentation",
    description: "API documentation for AI Mentor",
  },
  host: "192.168.0.218:3000", // Change to your host
  schemes: ["http"], // Or 'https' if you're using HTTPS
};

const outputFile = "./swagger.json";
const endpointsFiles = ["../../app.ts"]; // The path where your routes are defined

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("../../app.ts"); // Your entry point file for the server
});
