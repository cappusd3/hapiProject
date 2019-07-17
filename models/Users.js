const mongoose = require('mongoose');

const { Schema } = mongoose;

const UsersSchema = new Schema({
  id: { type: Number, unique: true },
  nick_name: { type: String },
  gender: Number,
  avatar_url: String,
  open_id: String,
  session_key: String,
}, {
    timestamps: true,
    autoIndex: true
  })


module.exports = mongoose.model('users', UsersSchema);
