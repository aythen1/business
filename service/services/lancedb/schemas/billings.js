const schemaBillings =  {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        limit: { type: 'number', default: 0 },
        email: { type: 'string' },
        vat: { type: 'string' },
        paymentmethod: { type: 'string', enum: ['credit', 'sepa'] },
        address: { 
            type: 'string',
            default: '{}'
            // properties: {
            //     name: { type: 'string', default: '' },
            //     // streetaddress1: { type: 'string', default: '' },
            //     // streetaddress2: { type: 'string', default: '' },
            //     // zip: { type: 'string', default: '' },
            //     // city: { type: 'string', default: '' },
            //     // country: { type: 'string', default: '' },
            //     // region: { type: 'string', default: '' },
            // },
        },
        upgradedat: { type: 'string', format: 'date-time' },
        vector: { type: 'array', items: { type: 'number' } },
        createdat: { type: 'string', format: 'date-time' }
        // relations: { type: 'object' }
        // data: { type: "object" }
    },
    required: ['email']
}

module.exports = schemaBillings;
