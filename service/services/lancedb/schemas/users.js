const schemaUsers = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        user: { type: 'string' },
        password: { type: 'string' },
        isverified: { type: 'boolean' },
        vector: { type: 'array', items: { type: 'number' } },
        upgradedat: { type: 'string', format: 'date-time' },
        createdat: { type: 'string', format: 'date-time' },
        // data: { type: "object" }
    },
    required: ['user', 'password', 'isverified', 'vector']
}

module.exports = schemaUsers;
