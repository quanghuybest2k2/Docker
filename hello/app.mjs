import express from "express";

import connectToDatabase from "./helpers.mjs";

const app = express();

app.get("/", (req, res) => {
  const message = "<h2>Xin chào lớp CTK44!</h2><p>Chúc các bạn thành công</p>";
  res.send(message);
});

await connectToDatabase();

console.log("Running");

app.listen(3000);
