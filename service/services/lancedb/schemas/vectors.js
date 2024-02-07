const schemaVectors = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        version: { type: 'string' },

        title: { type: 'string' },
        description: { type: 'string' },

        code: { type: 'string' },
        data: { type: 'string' },

        updatedAt: { type: 'string', format: 'date-time' },
        createdAt: { type: 'string', format: 'date-time' },
    },
    required: ['id', 'title']
}

module.exports = schemaVectors;