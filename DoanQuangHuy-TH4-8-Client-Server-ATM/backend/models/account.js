const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountSchema = new Schema({
  email: String,
  password: String,
  money: Number
});

const AccountModel = mongoose.model('Account', accountSchema);

module.exports = AccountModel;