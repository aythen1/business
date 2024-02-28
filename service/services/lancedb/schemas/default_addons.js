const schemaAddons = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        image: { type: 'string' },
        tags: { type: 'string', default: '[]' },
        title: { type: 'string' },
        description: { type: 'string' },
        fav: { type: 'boolean', default: false },
        labels: { type: 'string', default: '{}' },

        createdAt: { type: 'string', format: 'date-time' },
    },
    required: ['id']
}

module.exports = schemaAddons;