const config = require('../config')

const validate = (decoded, request, h) => {
  // decoded 为 JWT payload 被解码后的数据
  console.log('validate: ', decoded)
  const { userId } = decoded

  if (!userId) {
    return { isValid: false }
  }

  const credentials = {
    userId,
  }

  // 在路由接口的 handler 通过 request.credential 获取 jwt decoded 的值
  return { isValid: true, credentials }
}

module.exports = (server) => {
  server.auth.strategy('jwt', 'jwt', {
    key: config.jwtSecret,
    validate: validate,
    verifyOptions: { algorithms: ['HS256'] },
  });
  server.auth.default('jwt');
};
