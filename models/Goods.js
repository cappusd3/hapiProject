const mongoose = require('mongoose');

const { Schema } = mongoose;

const GoodsSchema = new Schema({
  id: { type: Number, unique: true },
  shop_id: { type: Number },
  name: String,
  thumb_url: String,
}, {
    timestamps: true
  })


module.exports = mongoose.model('goods', GoodsSchema);
