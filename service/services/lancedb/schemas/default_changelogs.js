const schemaChangelogs = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        type: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        available: { type: 'boolean', default: true },
        next: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time', default: new Date().toISOString() },
    },
    required: ['id', 'type', 'title', 'description']
}

module.exports = schemaChangelogs;