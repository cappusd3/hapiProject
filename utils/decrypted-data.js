// 解码小程序的 encryptData
const crypto = require('crypto');

const decryptData = (encryptedData, iv, sessionKey, appId) => {
  // base64 decode
  var encryptedData = Buffer.from(encryptedData, 'base64');
  var sessionKey = Buffer.from(sessionKey, 'base64');
  var iv = Buffer.from(iv, 'base64');
  var decoded
  try {
    // 解密，使用 AES-128-CBC
    let decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
    // 设置自动 padding 为 true ，删除填充补位
    decipher.setAutoPadding(true)
    decoded = decipher.update(encryptedData, 'binary', 'utf8')
    decoded += decipher.final('utf8')

    decoded = JSON.parse(decoded);
  } catch (err) {
    throw new Error('Illegal Buffer')
  }

  // 解密后的用户数据中会有一个 watermark 属性，这个属性中包含这个小程序的 appid 和时间戳，下面是效验 appid
  if (decoded.watermark.appid !== appId) {
    throw new Error('Illegal Buffer')
  }

  return decoded
}

module.exports = decryptData;
