const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { signup, login, changePassword  } = require("./controllers/authController");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.post("/signup", signup);
app.post("/login", login);
app.post("/changepassword", changePassword);

app.listen(9000, function(){
    console.log("Server Started");
});