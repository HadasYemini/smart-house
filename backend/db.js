const db = require("mongoose");

db.connect(
  "mongodb+srv://hadas:hy1234hy@cluster0.nefe6tn.mongodb.net/smartHouseDb"
);

const userSchema = db.Schema({
  name: String,
  email: String,
  password: String,
});

const usersModel = db.model("users", userSchema);

const roomsSchema = db.Schema({
  rooms : Object
});

const roomsModel = db.model("rooms", roomsSchema);

module.exports = {
    usersModel,
    roomsModel
}