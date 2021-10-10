'use strict'
const configureKnex=require('../../knexfile')
const knex=require('knex')
const connectedKnex=knex(configureKnex.development)

module.exports=connectedKnex