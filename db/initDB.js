const mongoose = require('mongoose')
const _ = require('lodash')

const Car = require('./carModel')

const config = require('../config')

mongoose.Promise = global.Promise
mongoose.connect(config.dbUrl)
const connection = mongoose.connection

connection.on('error', console.error.bind(console, 'connection error:'))
connection.once('open', () => {
  console.log('Mongoose connected to ' + config.dbUrl)
})

const fuelTypes = ['Gasoline', 'Disel']
const transmissionTypes = ['Manual', 'Automatic']

let carsData = {
  'Mitsubishi': [
    {
      model: 'Lancer',
      photos: ['https://www.mitsubishi-motors.ca/media/vehicle/nav/15LanEvoFE_Titanium-Grey_09_medium.png']
    },
    {
      model: 'Outlander',
      photos: ['http://www.blogcdn.com/slideshows/images/slides/366/249/0/S3662490/slug/l/001-2015-mitsubishi-outlander-sport-quick-spin-1.jpg']
    },
    {
      model: 'Pajero',
      photos: ['https://www.mitsubishi-motors.com.au/uploads/vehicles/pajero/2017/pajero-gls.png']
    }
  ],
  'Volvo': [
    {
      model: 'S90',
      photos: ['https://i.ytimg.com/vi/BYCPcQAsy_g/maxresdefault.jpg']
    },
    {
      model: 'V90',
      photos: ['https://2.bp.blogspot.com/-yeGjov-PR6Y/V9q_Nf98B2I/AAAAAAABeIY/tJ8rU8Dlba88VZXgUNECm-zE5s1vrfb2wCLcB/s1600/Volvo-V90-CC.jpg']
    },
    {
      model: 'XC90',
      photos: ['http://st.motortrend.com/uploads/sites/10/2016/02/2017-volvo-xc90-front-three-quarters.jpg']
    }
  ],
  'BMW': [
    {
      model: 'I8',
      photos: ['http://buyersguide.caranddriver.com/media/assets/submodel/7821.jpg']
    },
    {
      model: 'I3',
      photos: ['http://www.bmw.co.uk/dam/brandBM/common/newvehicles/i-series/i3/2015/at-a-glance/bmwi-i3-more-than-a-car-project-i-03.jpg.resource.1452011239907.jpg']
    },
    {
      model: 'M6',
      photos: ['http://cdn.bmwblog.com/wp-content/uploads/2017/02/Bill-Auberlen-BMW-M4-GTS-01.jpg']
    }
  ],
  'Toyota': [
    {
      model: 'AE86',
      photos: ['https://en.wikipedia.org/wiki/Toyota_AE86#/media/File:New_stock_ae86_coupe.jpg']
    }
  ]
}

function addCars () {
  let promises = []
  const manufacturers = Object.keys(carsData)
  manufacturers.forEach((make) => {
    const models = carsData[make]
    models.forEach((model) => {
      const car = new Car({
        manufacturer: make,
        model: model.model,
        fuelType: _.sample(fuelTypes),
        transmissionType: _.sample(transmissionTypes),
        photos: model.photos,
        year: _.random(1990, 2017),
        price: _.random(2000, 100000),
        engineDisplacement: _.random(15, 60) * 100,
        views: _.random(0, 1000),
        kilometrage: _.random(100, 300)
      })
      promises.push(car.save())
    })
  })
  return Promise.all(promises)
}

const promises = _.times(1000, () => addCars())

Promise.all(promises)
.then(() => {
  console.log('Done')
  process.exit()
})
.catch((error) => {
  console.log(error)
  process.exit(1)
})

