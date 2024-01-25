const schemaNews = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        url: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        available: { type: 'boolean', default: true },
        createdAt: { type: 'string', format: 'date-time', default: new Date().toISOString() },
    },
    required: ['id', 'url', 'title', 'description']
}

module.exports = schemaNews;