'use strict'

const Hapi = require('@hapi/hapi');
const hapiAuthJWT2 = require('hapi-auth-jwt2');
require('env2')('./.env')
const DbConfig = require('./config/db_config')
const Mongoose = require('mongoose');

const pluginHapiSwagger = require('./plugins/hapi-swagger');
const pluginHapiPagination = require('./plugins/hapi-pagination');
const pluginHapiAuthJWT2 = require('./plugins/hapi-auth-jwt2');

const routesHelloWorld = require('./routes/helloworld');
const routesShops = require('./routes/shops');
const routesOrders = require('./routes/orders');
const routesUsers = require('./routes/users');

Mongoose.connect('mongodb://localhost:27017/hapidb', { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('连接成功...'))
  .catch(err => console.error(err));

// create task model
// const Task = Mongoose.model('Task', { text: n });

const start = async () => {

  const server = Hapi.server({
    port: DbConfig.port,
    host: DbConfig.host,
    routes: {
      cors: true
    }
  })

  await server.register([
    ...pluginHapiSwagger,
    pluginHapiPagination,
    hapiAuthJWT2
  ]);

  pluginHapiAuthJWT2(server);

  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: __dirname + '/templates'
  })

  server.route([
    // 创建一个简单的hello world接口
    ...routesHelloWorld,
    ...routesShops,
    ...routesOrders,
    ...routesUsers,
  ]);

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

start()
