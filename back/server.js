const express = require('express')
const fs = require('fs')
const cors = require('cors')
const {uniqueCities,percentage} = require('./utils/utils')
const app = express()
const router = express.Router()

const dataFilePath = './data.json'
let data = []

if(fs.existsSync(dataFilePath)) {
    data = JSON.parse(fs.readFileSync(dataFilePath,'utf-8'))
}

app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use('/', router)

router.route('/users')
  .get((req, res) => {
    if (data.length > 0) {
      return res.status(200).json(data)
    } else {
      return res.status(500).json({status: 'error', message: 'no data found'})
    }
  })
  .put((req, res) => {
    const id = req.params.id
    if (!id) {
      res.status(400).json({status: 'error', message: 'no id provided'})
    }
    const newdata = data.map((item) => {
      if (id == item.id) {
        return req.body
      }
      return item
    })
    fs.writeFileSync(dataFilePath, JSON.stringify(newdata))
    res.status(200).json({status: 'success', message: 'user updated'})
  })
  .post((req, res) => {
    const id = data.length > 0 ? data[data.length - 1].id + 1 : 1
    const newRecord = { id, ...req.body }
    data.push(newRecord)
    fs.writeFileSync(dataFilePath, JSON.stringify(data))
    res.status(200).json({status: 'success', message: 'user added'})
  })
  .delete((req, res) => {
    const id = req.query.id
    if (!id) {
      res.status(400).json({status: 'error', message: 'no id provided'})
    }
    const newdata = data.filter((item) => {
      return item.id != id
    })
    fs.writeFileSync(dataFilePath, JSON.stringify(newdata))
    res.status(200).json({status: 'success', message: 'user deleted'})
  })

router.get('/chartData',(req,res) => {
    const cities = uniqueCities(data)
    const percentages = percentage(data,cities)
    console.log(percentages)
    if(percentages) {
        return res.status(200).json({data: percentages})
    } else {
        return res.status(500).json({status: 'error', message: 'internal server error'})
    }
})

app.listen(5000, (error) => {
  if (error) {
    console.log(error)
  }
  console.log('app started on port 5000')
})
