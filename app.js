'use strict'

const Hapi = require('@hapi/hapi');
require('env2')('./.env')
const DbConfig = require('./config/db_config')
const Mongoose = require('mongoose');

const pluginHapiSwagger = require('./plugins/hapi-swagger');
const pluginHapiPagination = require('./plugins/hapi-pagination');

const routesHelloWorld = require('./routes/helloworld');
const routesShops = require('./routes/shops');
const routesOrders = require('./routes/orders');

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
    pluginHapiPagination
  ]);

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
  ]);

  // server.route({
  //   method: 'GET',
  //   path: '/tasks',
  //   handler: async (request, h) => {
  //     let tasks = await Task.find();
  //     return h.response(tasks);
  //     // return h.view('tasks', {
  //     //   tasks: tasks
  //     // })
  //   }
  // })

  // server.route({
  //   method: 'POST',
  //   path: '/tasks',
  //   options: {
  //     validate: {
  //       payload: {
  //         text: Joi.string().min(3).required()
  //       },
  //       failAction: (request, h, error) => {
  //         return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
  //       }
  //     }
  //   },
  //   handler: async (request, h) => {
  //     try {
  //       const payload = request.payload;
  //       let text = payload.text;
  //       let newTask = new Task({ text: text });
  //       await newTask.save();
  //       let tasks = await Task.find();
  //       return h.view('tasks', {
  //         tasks: tasks
  //       })
  //       // return h.response(result)
  //     } catch (error) {
  //       return h.response(error).code(500);
  //     }
  //   }
  // })

  // server.route({
  //   method: 'DELETE',
  //   path: '/task/{id}',
  //   handler: async (request, h) => {
  //     try {
  //       let result = await Task.findByIdAndDelete(request.params.id);
  //       return h.response(result);
  //     } catch (error) {
  //       return h.response(error).code(500);
  //     }
  //   }
  // })

  // server.route({
  //   method: 'GET',
  //   path: 'https://api.weixin.qq.com/sns/jscode2session?appid={appid}&secret={appSecret}&js_code={code}&grant_type=authorization_code',
  //   handler: async (request, h) => {
  //     try {
  //       return h.response(result);
  //     } catch (error) {
  //       return h.response(error).code(500);
  //     }
  //   }
  // })

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

start()
