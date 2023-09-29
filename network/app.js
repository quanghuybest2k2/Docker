const express = require("express");
const axios = require("axios");
const app = express();

const API_URL = "https://vn-public-apis.fpo.vn";

app.get("/provinces", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "/provinces/getAll?limit=-1");
    const provinces = response.data.data;
    const info = provinces.data.map((province) => province);

    let tableHtml = "<table><tr><th>Tên</th><th>Loại</th></tr>";
    info.forEach((info) => {
      tableHtml += `<tr><td>${info.name}</td><td>${info.type}</td></tr>`;
    });
    tableHtml += "</table>";

    res.send(tableHtml);
  } catch (error) {
    console.error("Lỗi tìm nạp dữ liệu từ API:", error);
    res.status(500).json({ error: "Lỗi máy chủ" });
  }
});
app.get("/districts", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "/districts/getAll?limit=-1");
    const districts = response.data.data;
    const info = districts.data.map((district) => district);

    let tableHtml = "<table><tr><th>Tên</th><th>Loại</th></tr>";
    info.forEach((info) => {
      tableHtml += `<tr><td>${info.name}</td><td>${info.type}</td></tr>`;
    });
    tableHtml += "</table>";

    res.send(tableHtml);
  } catch (error) {
    console.error("Lỗi tìm nạp dữ liệu từ API:", error);
    res.status(500).json({ error: "Lỗi máy chủ" });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Go to link: http://localhost:3000");
});
