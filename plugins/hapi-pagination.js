const hapiPagination = require('hapi-pagination');

const options = {
  query: {
    page: {
      name: 'page',
      default: 1,
    },
    limit: {
      name: 'limit',
      default: 10
    },
    pagination: {
      name: 'pagination',
      default: true,
      active: true
    },
    invalid: 'defaults',
  },
  meta: {
    location: 'body',
    name: 'metadata',
    count: {
      active: true,
      name: 'count'
    },
    totalCount: {
      active: true,
      name: 'totalCount',
    },
    pageCount: {
      active: true,
      name: 'pageCount',
    },
    self: {
      active: true,
      name: 'self',
    },
    previous: {
      active: true,
      name: 'previous',
    },
    next: {
      active: true,
      name: 'next',
    },
    first: {
      active: true,
      name: 'first',
    },
    last: {
      active: true,
      name: 'last',
    },
    page: {
      active: true,
      // name == default.query.page.name
    },
    limit: {
      active: true,
    },
  },
  results: {
    name: 'results',
  },
  reply: {
    paginate: 'paginate',
  },
  routes: {
    include: [
      '/shops', // 店铺列表支持分页特性
      '/shops/{shopId}/goods',
    ],
    exclude: []
  }
}

module.exports = {
  plugin: hapiPagination,
  options: options,
}