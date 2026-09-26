const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const PORT = process.env.PORT || 8080;

const SERVICE3_URL =
  process.env.SERVICE3_URL || "http://localhost:8081";

app.get("/api/greeting", async (req, res) => {

  const name = req.query.name;

  if (!name || !name.trim()) {
    return res.status(400).json({
      message: "Name is required"
    });
  }

  console.log(`Service 2 received name: ${name}`);

  const helloMessage = `Hello ${name.trim()}`;

  console.log(`Service 2 created message: ${helloMessage}`);

  try {
    console.log(`Calling Service 3 at URL: ${SERVICE3_URL}`);
    const response = await fetch(
      `${SERVICE3_URL}/greeting?message=${encodeURIComponent(helloMessage)}`
    );

    if (!response.ok) {
      throw new Error(
        `Service 3 returned status ${response.status}`
      );
    }

    const data = await response.json();

    console.log(`Response received from Service 3: ${data.message}`);

    return res.json(data);

  } catch (error) {

    console.error("Error calling Service 3:", error.message);

    return res.status(500).json({
      message: "Unable to get greeting from Service 3"
    });
  }
});

app.get("/health", (req, res) => {
  res.json({
    status: "UP",
    service: "service-2"
  });
});

app.listen(PORT, () => {
  console.log(`Service 2 running on updated port ${PORT}`);
});