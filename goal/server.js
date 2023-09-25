const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 80;
let userGoal = "Học Docker!";
let userResult = "Để biết DevOps!";

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send(`
    <link rel="stylesheet" href="styles.css">
    <section>
      <h2>Đoàn Quang Huy</h2>
      <h3>${userGoal}</h3>
      <h3>${userResult}</h3>
    </section>
    <form action="/store-goal" method="POST">
      <div class="form-control">
        <label>Mục tiêu</label>
        <input type="text" name="goal">
        <label>Kết quả</label>
        <input type="text" name="result">
      </div>
      <button>Đặt mục tiêu</button>
    </form>
  `);
});

app.post("/store-goal", (req, res) => {
  const enteredGoal = req.body.goal;
  const enteredResult = req.body.result;
  console.log(enteredGoal);
  console.log(enteredResult);
  userGoal = enteredGoal;
  userResult = enteredResult;
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Go to link http://localhost:${port}`);
});
