const schemaBillings =  {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        type: { type: 'string' },
        name: { type: 'string' },
        token: { type: 'string' },
        email: { type: 'string' },
        limit: { type: 'number', default: 0 },
        iban: { type: 'string' },
        currency: { type: 'string' },
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
        createdat: { type: 'string', format: 'date-time' }
    },
    required: ['id']
}

module.exports = schemaBillings;
