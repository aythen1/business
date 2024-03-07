const schemaTemplates = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        bearer: { type: 'string' },
        owner: { type: 'string' },

        href: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        tags: { type: 'string', default: '[]' },

        ispublic: { type: 'boolean', default: true },
        isavailable: { type: 'boolean', default: true },

        components: { type: 'string', default: '[]' }, //delete

        updatedAt: { type: 'string', format: 'date-time' },
        createdAt: { type: 'string', format: 'date-time' },
    },
    required: ['id', 'title']
}

module.exports = schemaTemplates;