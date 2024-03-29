const env = process.env;

module.exports = {
  host: env.HOST,
  port: env.PORT,
  jwtSecret: env.JWT_SECRET,
  wxSecret: env.WX_SECRET,
  wxAppid: env.WX_APPID,
  wxMchid: env.WX_MCHID,
  wxPayApiKey: env.WX_PAY_API_KEY,
}