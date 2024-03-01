const schemaAddons = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        bearer: { type: 'string' },
        owner: { type: 'string' },

        available: { type: 'boolean' },
        public: { type: 'boolean' },

        image: { type: 'string' },
        title: { type: 'string' },
        href: { type: 'string' },
        description: { type: 'string' },
        tags: { type: 'string', default: '[]' },

        components: { type: 'string', default: '[]' },
        // hay un object 

        updatedAt: { type: 'string', format: 'date-time' },
        createdAt: { type: 'string', format: 'date-time' },
    },
    required: ['id', 'title']
}

module.exports = schemaAddons;