const schemaTickets = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        bearer: { type: 'string' },
        subject: { type: 'string' },
        product: { type: 'string', default: 'N/A' },
        status: { type: 'number', enum: [200, 300, 400] },
        updatedAt: { type: 'string', format: 'date-time', default: new Date().toISOString() },
        createdAt: { type: 'string', format: 'date-time', default: new Date().toISOString() },
    },
    required: ['id']
}

module.exports = schemaTickets;