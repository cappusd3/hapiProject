const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Pack = require('package');
const HapiSwagger = require('hapi-swagger');

module.exports = [
  Inert,
  Vision,
  {
    plugin: HapiSwagger,
    options: {
      info: {
        title: '接口文档',
        version: Pack.version,
      },
      grouping: 'tags',
      tags: [
        { name: 'test', description: '测试相关1' },
        { name: 'shops', description: '店铺、商品相关' },
        { name: 'orders', description: '订单相关' },
        { name: 'users', description: '用于测试的用户 JWT 签发' },
      ]
    }
  }
]