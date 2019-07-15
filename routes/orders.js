const Joi = require('@hapi/joi');

const GROUP_NAME = 'orders';

module.exports = [
  {
    method: 'POST',
    path: `/${GROUP_NAME}`,
    handler: async (request, h) => {
      return h.response('创建订单');
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '创建订单',
      // 适用于 POST 接口的 payload(request body) 验证 入参的数据
      // [
      //   { goods_id: 123, count: 1 },  // 1件 id 为 123 的商品
      //   { goods_id: 124, count: 2 },  // 2件 id 为 124 的商品
      // ]
      validate: {
        payload: {
          goodsList: Joi.array().items(
            Joi.object().keys({
              goods_id: Joi.number().integer(),
              count: Joi.number().integer()
            })
          )
        },
        // 适用于 header 额外字段约束的 headers 验证
        // 若 基于 JWT 的用户身份验证，会依赖 header 中的 authorization 字段的配置
        // 用 unknown 来做一个冗余处
        headers: Joi.object({
          authorization: Joi.string().required(),
        }).unknown(),
      }
    },
  },
  {
    method: 'POST',
    path: `/${GROUP_NAME}/{orderId}/pay`,
    handler: async (request, h) => {
      return h.response('支付某条订单');
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '支付某条订单',
      validate: {
        params: {
          orderId: Joi.string().required(),
        }
      }
    },
  },
]