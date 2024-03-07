const schemaAddons = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        bearer: { type: 'string' },
        owner: { type: 'string' },

        ispublic: { type: 'boolean', default: true },
        isavailable: { type: 'boolean', default: true },

        image: { type: 'string' },
        title: { type: 'string' },
        href: { type: 'string' },
        description: { type: 'string' },
        tags: { type: 'string', default: '[]' },

        // components: { type: 'string', default: '[]' }, //delete
        nodes: { type: 'string', default: '[]' },
        edges: { type: 'string', default: '[]' },
        // hay un object 

        updatedAt: { type: 'string', format: 'date-time' },
        createdAt: { type: 'string', format: 'date-time' },
    },
    required: ['id', 'title']
}

module.exports = schemaAddons;