
  const schemaPolices = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string' },
        description: { type: 'string' },
        target: { type: 'string', enum: ['none', 'users', 'applications'] },
        resource: { type: 'string' },
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
        performedBy: {
          type: 'array',
          items: {
              type: 'object',
              properties: {
                  email: { type: 'string' },
                  userId: { type: 'string', format: 'uuid' },
              },
              required: ['key', 'value'],
          },
        },
        createdAt: { type: 'string', format: 'date-time' },
    },
    required: ['id', 'name', 'target', 'resource']
}

module.exports = schemaPolices;
