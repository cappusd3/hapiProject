
// const { jwtHeaderDefine } = require('../utils/router-helper');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      console.log('credentials: ', request.auth.credentials);
      return h.response({
        text: 'hello-world'
      })
    },
    config: {
      auth: false,
      tags: ['api', 'test'],
      description: '测试 hello-world',
      // validate: {
      //   ...jwtHeaderDefine,
      // }
    },
  }
]
