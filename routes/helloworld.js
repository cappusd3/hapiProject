module.exports = [
  {
    method: 'GET',
    path: '/',
    config: {
      tags: ['api', 'test'],
      description: '测试 hello-world'
    },
    handler: (request, h) => {
      return h.response({
        text: 'hello-world'
      })
      // return h.view('index', {
      //   name: 'hello-world!'
      // })
    }
  }
]
