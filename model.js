//jshint esversion:6

const mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost:27017/giraffe",
//   { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.set("useCreateIndex", true);

mongoose.connect("mongodb+srv://admin-eliran:1997eliran@cluster0-xcpmf.mongodb.net/giraffe",
  { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useCreateIndex", true);


const userSchema = new mongoose.Schema({
  full_name: String,
  mobile: Number,
  email: String,
  management: Number,
  password: String,
  edit_mode: Boolean,
  last_login: Date
});
var User = mongoose.model("user", userSchema);

const proSchema = new mongoose.Schema({
  create_details: Object,
  name_pro: String,
  folder_system: Object,
  icon: String,
  folds: Array
});
var Pro = mongoose.model("pro", proSchema);



const systemSchema = new mongoose.Schema({
  list_ids: Array,
  cablanim: Array,
  folds: Array
});
var System = mongoose.model("system", systemSchema);









module.exports = {User: User, Pro: Pro, System: System};
