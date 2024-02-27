const schemaChatbots = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        version: { type: 'string' },
        public: { type: 'boolean', default: true },
        available: { type: 'boolean', default: true },

        logo: { type: 'string' },
        name: { type: 'string' },
        description: { type: 'string' },

        vector: { type: 'array', default: [0, 0] }, //default [0, 0]
        
        num: { type: 'number', default: 0 },
        message: {
            type: 'string',
            default: '[]'
            // items: {
            //     type: { type: 'string' },
            //     message: { type: 'string' },
            //     data: { type: 'array' },
            // }
        },

        updatedAt: { type: 'string', format: 'date-time', default: new Date().toISOString() },
        createdAt: { type: 'string', format: 'date-time', default: new Date().toISOString() },
    },
    required: ['id', 'name' ]
}

module.exports = schemaChatbots;