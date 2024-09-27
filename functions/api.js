#!/usr/bin/env node
'use strict'
const express = require('express')
const morgan = require('morgan')
const serverless = require('serverless-http')
const authenticate = require('../src/authenticate')
const params = require('../src/params')
const proxy = require('../src/proxy')

const app = express()
const router = express.Router()

// HTTP request logging
app.use(morgan('combined'))

router.enable('trust proxy')
router.get('/', authenticate, params, proxy)
router.get('/favicon.ico', (req, res) => res.status(204).end())

app.use("/api/", router);

// Export the app wrapped in serverless
module.exports.handler = serverless(app);
