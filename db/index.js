const mongoose = require('mongoose')

require('./carModel')
const Car = mongoose.model('Car')

exports.getAll = () => Car.find()

exports.create = car => {
  let newCar = new Car(car)
  return newCar.save()
}

exports.read = id => Car.findOne({ _id: id })

exports.update = (id, car) => {
  return Car.findOneAndUpdate({ _id: id }, car, { new: true })
}

exports.delete = (id) => Car.remove({ _id: id })

exports.getCatalog = () => {
  return Car.find().distinct('manufacturer')
  .then(m => {
    const promises = m.map(i => getModels(i))
    return Promise.all(promises)
  })
  .then(c => {
    return c.reduce((acc, cur) => {
      acc[cur.manufacturer] = cur.models
      return acc
    }, {})
  })
}

const getModels = (manufacturer) => {
  return Car.find({ manufacturer: manufacturer }).distinct('model')
  .then(models => ({ manufacturer: manufacturer, models: models }))
}
