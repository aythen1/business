
const schemaApis = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        type: { type: 'string', enum: ['users', 'applications'] },
        name: { type: 'string' },
        description: { type: 'string' },
        bearer: { type: 'string' },
        expirationat: { type: 'string', format: 'date-time' },
        createdat: { type: 'string', format: 'date-time' },
    },
    required: ['id', 'type', 'name', 'bearer', 'expirationat']
}

module.exports = schemaApis;
