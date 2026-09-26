const express = require("express");

const app = express();

const PORT = process.env.PORT || 8080;

app.get("/greeting", (req, res) => {

  const message = req.query.message;

  if (!message || !message.trim()) {
    return res.status(400).json({
      message: "Message is required"
    });
  }

  console.log(`Service 3 received: ${message}`);

  const currentHour = new Date().getHours();
  let greeting;
  if (currentHour < 12) {
greeting = "Good Morning";
} else if (currentHour < 17) {
greeting = "Good Afternoon";
} else {
greeting = "Good Evening";
}

  const finalMessage =
    `${message.trim()}, ${greeting}! Welcome to our Kubernetes application.`;

  console.log(`Service 3 created: ${finalMessage}`);

  return res.json({
    message: finalMessage
  });
});


app.get("/health", (req, res) => {
  res.json({
    status: "UP",
    service: "service-3"
  });
});


app.listen(PORT, () => {
  console.log(`Service 3 running on updated port ${PORT}`);
});