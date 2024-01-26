const schemaUsers = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        avatar: { type: 'string' },
        language: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
        user: { type: 'string' },
        address: { type: 'string', default: '{}' },
        password: { type: 'string' },
        isverified: { type: 'boolean', default: false },
        upgradedat: { type: 'string', format: 'date-time' },
        createdat: { type: 'string', format: 'date-time' },
        // data: { type: "object" }
    },
    required: ['user', 'password', 'isverified', 'vector']
}

module.exports = schemaUsers;
