const schemaAssets =  {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        path: { type: 'string', path: '/' },
        base64: { type: 'string' },
    },
}

module.exports = schemaAssets;
