const redis = require('redis')
const asyncRedis = require('async-redis')
const config = require('../config')

syncRedisClient = redis.createClient(config.redis_port, config.redis_address)
redisClient = asyncRedis.decorate(syncRedisClient)

module.exports = {
  redisClient,
  redis
}
