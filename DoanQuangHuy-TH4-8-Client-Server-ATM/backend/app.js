const fs = require("fs");
const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const Account = require("./models/account");

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs", "access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/accounts", async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json({
      accounts: accounts.map((account) => ({
        _id: account.id,
        _email: account.email,
        _password: account.password,
        _money: account.money,
      })),
    });
    console.log("Thành công.");
  } catch (err) {
    console.error("Lỗi rồi");
    console.error(err.message);
    res.status(500).json({ message: "Thất bại!" });
  }
});

app.post("/accounts", async (req, res) => {
  const accountEmail = req.body._email ?? "";
  const accountPass = req.body._password ?? "";
  const accountMoney = req.body._money;

  if (
    !accountEmail ||
    accountEmail.trim().length === 0 ||
    !accountPass ||
    accountPass.trim().length === 0
  ) {
    console.log("Sai format");
    return res.status(422).json({ message: "Sai rồi" });
  }

  const account = new Account({
    email: accountEmail,
    password: accountPass,
    money: accountMoney,
  });

  try {
    await account.save();
    res.status(201).json({
      message: "Lưu tài khoản thành công",
      account: {
        _id: account.id,
        _email: accountEmail,
        _password: accountPass,
        _money: accountMoney,
      },
    });
    console.log("Tạo tài khoản mới thành công");
  } catch (err) {
    console.error("Lỗi rồi");
    console.error(err.message);
    res.status(500).json({ message: "Lỗi khi lưu" });
  }
});

app.delete("/accounts/:email/:password", async (req, res) => {
  try {
    const resp = await Account.deleteOne({
      email: req.params.email,
      password: req.params.password,
    });
    res
      .status(resp.deletedCount > 0 ? 200 : 401)
      .json({ message: "Đã xóa tài khoản!" });
    console.log("Đã xóa");
  } catch (err) {
    console.error("Lỗi fetching...");
    console.error(err.message);
    res.status(500).json({ message: "Lỗi khi xóa." });
  }
});

mongoose.connect(
  ` mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.1/user`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error("Kết nối thất bại!");
      console.error(err);
    } else {
      console.log("Kết nối mongodb thành công.");
      app.listen(80, () => {
        console.log("http://localhost/accounts");
      });
    }
  }
);
