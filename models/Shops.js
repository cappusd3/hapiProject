const mongoose = require('mongoose');
// hapi-pagination or mongoose-paginate
// const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

const ShopsSchema = new Schema({
  id: { type: Number, unique: true },
  name: { type: String },
  thumb_url: String
}, {
  timestamps: true
})

// ShopsSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('shops', ShopsSchema);
