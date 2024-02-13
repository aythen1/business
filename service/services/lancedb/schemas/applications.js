const schemaApplications = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string' },
        description: { type: 'string' },
        status: { type: 'string' },
        tags: {
          type: 'string',
          default: '[]'
        //   items: {
        //       type: 'object',
        //       properties: {
        //           key: { type: 'string' },
        //           value: { type: 'string' },
        //       }
        //   },
        },
        policies: {
          type: 'string',
          default: '[]'
        //   items: {
        //       type: 'object',
        //       properties: {
        //           key: { type: 'string' },
        //           value: { type: 'string' },
        //       }
        //   },
        },
        createdAt: { type: 'string', format: 'date-time' },
    },
    required: ['id', 'name', 'description', 'status']
}

module.exports = schemaApplications;