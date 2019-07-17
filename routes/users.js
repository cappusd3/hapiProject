const JWT = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const axios = require('axios');
const config = require('../config');
const models = require("../models");
const decryptData = require('../utils/decrypted-Data');

const GROUP_NAME = 'users';

module.exports = [{
  method: 'POST',
  path: `/${GROUP_NAME}/createJWT`,
  handler: async (request, h) => {
    const generateJWT = (jwtInfo) => {
      const payload = {
        userId: jwtInfo.userId,
        exp: Math.floor(new Date().getTime() / 1000 ) + 7 * 24 * 60 * 60,
      };
      return JWT.sign(payload, config.jwtSecret);
    };
    const token = await generateJWT({ userId: 1 })
    console.log('token: ', token)
    return h.response(token)
  },
  config: {
    tags: ['api', GROUP_NAME],
    description: '用于测试用户 JWT 签发',
    auth: false, // 约定此接口不参与 JWT 的用户验证，会结合下面的 hapi-auth-jwt 来使用
  }
}, {
  method: 'POST',
  path: `/${GROUP_NAME}/wxLogin`,
  handler: async (request, h) => {
    const appid = config.wxAppid // 小程序 appid
    const secret = config.wxSecret; // 小程序 appsecret
    const { code, encryptedData, iv } = request.payload;
    const response = await axios({
      url: 'https://api.weixin.qq.com/sns/jscode2session',
      method: 'GET',
      params: {
        appid,
        secret,
        js_code: code,
        grant_type: 'authorization_code'
      }
    });
    const { openid, session_key } = response.data;
    console.log('openid, session_key', openid, session_key);

    // 解码用户消息
    const userInfo = decryptData(encryptedData, iv, session_key, appid);
    console.log(userInfo)

    // 基于 openid 查找或者创建一个用户
    let user = await models.users.findOne({
      open_id: openid
    })
    if (user) {
      await models.users.findOneAndUpdate({ open_id: openid }, {
        open_id: openid,
        nick_name: userInfo.nickName,
        gender: userInfo.gender,
        avatar_url: userInfo.avatarUrl,
        session_key: session_key,
      })
    } else {
      // 新增一个 user
      let usersModel = new models.users({
        open_id: openid,
        nick_name: userInfo.nickName,
        gender: userInfo.gender,
        avatar_url: userInfo.avatarUrl,
        session_key: session_key,
      })
      user = await usersModel.save()
      console.log(user._id)
    }
    // 更新用户信息
    // let user = await models.users.update({
    //   query: { open_id: openid },
    //   update: {
    //     $setOnInsert: {
    //       nick_name: userInfo.nickName,
    //       gender: userInfo.gender,
    //       avatar_url: userInfo.avatarUrl,
    //       open_id: openid,
    //       session_key: session_key,
    //     }
    //   },
    //   new: true,
    //   upsert: true
    // });

    // 签发 jwt
    const generateJWT = (jwtInfo) => {
      const payload = {
        userId: jwtInfo.userId,
        exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60,
      };
      return JWT.sign(payload, config.jwtSecret);
    };
    let token = await generateJWT({
      userId: user.id,
    })
    return h.response(token);
  },
  config: {
    auth: false,
    tags: ['api', GROUP_NAME],
    validate: {
      payload: {
        code: Joi.string().required().description('微信用户登录的临时 code'),
        encryptedData: Joi.string().required().description('微信用户信息 encryptedData'),
        iv: Joi.string().required().description('微信用户信息 iv'),
      }
    }
  }
}]