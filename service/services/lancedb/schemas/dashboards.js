
const schemaDashboards = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        version: { type: 'string' },
        public: { type: 'boolean', default: false },

        title: { type: 'string' },
        description: { type: 'string' },

        filter: { type: 'string' },
        
        components: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                available: { type: 'string' },
                type: { type: 'string' },
                position: { type: 'string' },
                title: { type: 'string' },
                description: { type: 'string' },
                columnSize: { type: 'string' },
                style: { type: 'string' },
                vector: { type: 'string' },
                filter: { type: 'string' },
            }
        },

        shared: { 
            type: 'object', 
            properties: {
                id: { type: 'string' },
                role: { type: 'string' },
            }
        },

        updatedAt: { type: 'string', format: 'date-time' },
        createdat: { type: 'string', format: 'date-time' },
    },
    required: ['id', 'version', 'public', 'title']
}

module.exports = schemaDashboards;
