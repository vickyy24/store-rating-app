const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { signup, login, changePassword, verifyUser, logout  } = require("./controllers/authController");
const { addUser, addStore , getDashboardCounts, getAdminUsers, getNormalUsers, getStoreData } = require("./Controllers/adminController");
const { getAllStores, submitRating, updateRating } = require("./controllers/userController");
const { getStoreRatingsUsers, getStoreAverageRating } = require("./controllers/storeOwnerController");

const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.post("/signup", signup);
app.post("/login", login);
app.post("/change-password", changePassword);
app.get("/verify-user", verifyUser);
app.get("/logout", logout);

app.post("/add-user", addUser);
app.post("/add-store", addStore);
app.get("/dashboard-counts", getDashboardCounts);
app.get("/admin-users", getAdminUsers);
app.get("/normal-users", getNormalUsers);
app.get("/store-list", getStoreData);

app.get("/all-stores", getAllStores);
app.post("/submit-rating", submitRating);
app.put("/update-rating", updateRating);

app.get("/store-rating-users", getStoreRatingsUsers);
app.get("/store-average-rating", getStoreAverageRating);

app.listen(9000, function(){
    console.log("Server Started");
});