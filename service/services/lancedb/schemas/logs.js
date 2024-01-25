
  const schemaLogs = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        action: { type: 'string', enum: ['created', 'updated', 'deleted'] },
        resource: { type: 'string' },
        performedby: {
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
        createdat: { type: 'string', format: 'date-time' },
    },
    required: ['id', 'action']
}

module.exports = schemaLogs;