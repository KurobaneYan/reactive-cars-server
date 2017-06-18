const mongoose = require('mongoose')

require('./carModel')
const Car = mongoose.model('Car')

exports.getAll = () => Car.find()

exports.create = car => {
  const newCar = new Car(car)
  return newCar.save()
}

exports.read = id => Car.findById(id)

exports.update = (id, car) => {
  return Car.findOneAndUpdate({ _id: id }, car, { new: true })
}

exports.delete = id => Car.remove({ _id: id })

exports.show = id => {
  return Car.findById(id)
  .then(car => {
    car.views += 1
    return Car.findOneAndUpdate({ _id: id }, car, { new: true })
  })
}

const getModels = (manufacturer) => {
  return Car.find({ manufacturer: manufacturer }).distinct('model')
  .then(models => ({ manufacturer: manufacturer, models: models }))
}

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
