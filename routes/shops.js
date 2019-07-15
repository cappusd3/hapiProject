const Joi = require('@hapi/joi');
const models = require('../models');
const { paginationDefine } = require('../utils/router-helper');

const GROUP_NAME = 'shops';

module.exports = [
  {
    method: 'GET',
    path: `/${GROUP_NAME}`,
    handler: async (request, h) => {
      // 通过 await 来异步查取数据
      // let newShop = new models.shops({
      //   id: 3,
      //   name: '店铺3',
      //   thumb_url: '3.png',
      // })
      // await newShop.save();
      let { limit, page } = request.query
      let count = (page - 1) * limit
      const result = await models.shops.find().limit(10).skip(count);
      const totalCount = await models.shops.countDocuments();
      request.totalCount = totalCount;
      return h.response(result).code(200);

      // mongoose-paginate
      // const result = await models.shops.paginate({}, { page, limit })
      // return h.response(result).code(200);
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '获取店铺列表',
      // 常见的带有分页特性的拉取店铺列表数据: http://localhost/shops?page=1&limit=10
      validate: {
        query: {
          ...paginationDefine
        }
      }
    },
  },
  {
    method: 'GET',
    path: `/${GROUP_NAME}/{shopId}/goods`,
    handler: async (request, h) => {
      return h.response('获取店铺的商品列表')
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '获取店铺的商品列表',
      validate: {
        params: {
          shopId: Joi.string().required().description('店铺的 id'),
        },
        query: {
          ...paginationDefine
        }
      }
    },
  },
];