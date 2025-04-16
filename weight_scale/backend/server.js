const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(cors());

// Setup MySQL Connection
const db = mysql.createConnection({
  host: "localhost",  // Change if using a remote server
  user: "root",       // Change to your MySQL username
  password: "",       // Change to your MySQL password
  database: "weight_scale_db",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL Connection Failed:", err);
  } else {
    console.log("Connected to MySQL Database!");
  }
});

// Setup SerialPort (Update COM Port)
const port = new SerialPort({
    path: 'COM3', // or '/dev/ttyUSB0' for Linux
    baudRate: 9600,
  });
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

parser.on("data", (data) => {
  const weight = parseFloat(data.trim());
  console.log("Weight Received:", weight);

  // Store weight in MySQL
  const query = "INSERT INTO weight_readings (weight_value) VALUES (?)";
  db.query(query, [weight], (err, result) => {
    if (err) {
      console.error("Error inserting weight into database:", err);
    } else {
      console.log("Weight stored successfully in DB:", result.insertId);
    }
  });

  // Emit weight data to frontend
  io.emit("weightData", weight);
});

port.on("error", (err) => {
  console.error("Serial Port Error:", err);
});

io.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
});

app.get("/weights", (req, res) => {
    db.query("SELECT * FROM weight_readings ORDER BY timestamp DESC LIMIT 10", (err, results) => {
      if (err) {
        res.status(500).json({ error: "Database error" });
      } else {
        res.json(results);
      }
    });
  });
  

server.listen(3000, () => console.log("Server running on port 3000"));
