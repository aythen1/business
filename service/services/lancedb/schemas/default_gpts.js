const schemaGpts = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        image: { type: 'string' },
        fav: { type: 'boolean', default: false },
        title: { type: 'string' },
        description: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
    },
    required: ['id']
}

module.exports = schemaGpts;