'use strict'

const http = require('http')

const api = require('./api')

const vulcanServer = http.Server(api)

vulcanServer.listen(process.env.PORT || 4000, () => {
    console.log('server is running')
})