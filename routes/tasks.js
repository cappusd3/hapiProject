module.exports = [
  {
    method: 'GET',
    path: '/tasks',
    handler: (request, h) => {
      let tasks = await Task.find();
      return h.response(tasks);
    }
  }
]