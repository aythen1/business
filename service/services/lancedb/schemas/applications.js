const schemaApplications = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string' },
        description: { type: 'string' },
        status: { type: 'string' },
        tags: {
          type: 'array',
          items: {
              type: 'object',
              properties: {
                  key: { type: 'string' },
                  value: { type: 'string' },
              },
              required: ['key', 'value'],
          },
        },
        policies: {
          type: 'array',
          items: {
              type: 'object',
              properties: {
                  key: { type: 'string' },
                  value: { type: 'string' },
              },
              required: ['key', 'value'],
          },
        },
        createdAt: { type: 'string', format: 'date-time' },
    },
    required: ['id', 'name', 'description', 'status']
}

module.exports = schemaApplications;