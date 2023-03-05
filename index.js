const express = require("express");
const jwt = require("jsonwebtoken");
const SECRET = "secret";
const app = express();

app.get("/", (req, res) => {
  res.json({
    messagee: "a simple api",
  });
});

app.post("/login", (req, res) => {
  const user = {
    id: 1,
    username: "anil",
    password: "anilabc.com",
  };

  jwt.sign(user, SECRET, { expiresIn: "3000s" }, (err, token) => {
    res.json({
      token,
    });
  });
});
const verifyToken = (req, res, next) => {
  const auth_data = req.headers.authentication;
  if (auth_data) {
    const token = auth_data.split(" ")[1];
    req.token = token;
    next();
  } else {
    res.send({
      result: "token is not valid",
    });
  }
};
app.post("/profile", verifyToken, (req, res) => {
  jwt.verify(req.token, SECRET, (err, authData) => {
    if (err) {
      res.send({
        result: err.message,
      });
    } else {
      res.send({
        message: "profile page accessed",
        authData,
      });
    }
  });
});
app.listen(5000, () => console.log("application running on port 5000"));
