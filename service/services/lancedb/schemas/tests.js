const schemaTests =  {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        title: { type: 'string' },
        description: { type: 'string' },
    },
}

module.exports = schemaTests;
