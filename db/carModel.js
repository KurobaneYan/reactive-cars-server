const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
  manufacturer: String,
  model: String,
  year: Number,
  kilometrage: Number,
  fuelType: String,
  engineDisplacement: Number,
  transmissionType: String,
  photos: [String],
  price: Number,
  views: Number
})

const Car = mongoose.model('Car', carSchema)

module.exports = Car
