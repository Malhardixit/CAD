const express = require('express')
const registrarRouter = express.Router()
const {getComplaints} = require('../controllers/registrarComplaints.controller')

registrarRouter.get('/complaints',getComplaints)
module.exports = {
    registrarRouter
}