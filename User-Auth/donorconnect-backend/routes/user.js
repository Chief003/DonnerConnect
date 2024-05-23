const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const db = mysql.createConnection({
  host: "localhost",
  user: "Elvis",
  password: "Elvis321&",
  database: "donorconnect"
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected...");
});

router.post("/signup", (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 8);

  const user = { email, password: hashedPassword };

  const query = "INSERT INTO users SET ?";

  db.query(query, user, (err, result) => {
    if (err) throw err;
    res.send("User registered");
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";

  db.query(query, [email], (err, results) => {
    if (err) throw err;

    if (results.length === 0) {
      return res.status(404).send("User not found");
    }

    const user = results[0];

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return res.status(401).send("Invalid password");
    }

    const token = jwt.sign({ id: user.id }, "your_jwt_secret", { expiresIn: 86400 });

    res.status(200).send({ auth: true, token });
  });
});

module.exports = router;
