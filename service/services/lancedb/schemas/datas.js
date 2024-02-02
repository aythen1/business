const schemaDatas = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        title: { type: 'string' },
        image: { type: 'string', default: '' },
        header: { type: 'string', default: '[]' },
        data: { type: 'string', default: '[]' },
        size: { type: 'number', default: 0 },
        createdAt: { type: 'string', format: 'date-time' },
    },
    required: ['id', 'title', 'header', 'data']
}

module.exports = schemaDatas;