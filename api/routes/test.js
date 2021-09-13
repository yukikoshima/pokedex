const { Router } = require('express')
// import {Router} from 'express'

const router = Router()

// Test route
router.use('/test', (req, res) => {
  console.log('/testが呼ばれたよ');
  res.end('Test API!')
})

module.exports = router