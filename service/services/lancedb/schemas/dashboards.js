
const schemaDashboards = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        version: { type: 'string' },
        
        public: { type: 'boolean', default: false },
        title: { type: 'string' },
        description: { type: 'string' },
        styles: {
            type: 'object',
            properties: {
                columnSize: { type: 'string' }
            }
        },
        
        filter: { type: 'string' },
        filterSQL: { type: 'string' },
        filterGraph: { type: 'string' },
        
        promptId: { type: 'string' },
        sharedId: { type: 'string' },
        dataId: { type: 'string' },

        updatedAt: { type: 'string', format: 'date-time' },
        createdat: { type: 'string', format: 'date-time' },
    },
    required: ['id', 'version', 'public', 'title']
}

module.exports = schemaDashboards;
