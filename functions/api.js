#!/usr/bin/env node
'use strict'
const express = require('express')
const morgan = require('morgan')
const serverless = require('serverless-http')
const authenticate = require('../src/authenticate')
const params = require('../src/params')
const proxy = require('../src/proxy')

const app = express()

// HTTP request logging
app.use(morgan('combined'))

app.enable('trust proxy')
app.get('/', authenticate, params, proxy)
app.get('/favicon.ico', (req, res) => res.status(204).end())

// Export the app wrapped in serverless
module.exports.handler = serverless(app);
