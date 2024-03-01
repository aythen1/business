
const schemaInvoices = {
    type: 'object',
    properties: {
      id: {type: 'uuid'},
      invoiceNumber: {type: 'string'},
      invoiceDate: {type: 'string', 'format': 'date-time'},
      clientName: {type: 'string'},
      companyName: {type: 'string'},
      companyEmail: {type: 'string'},
      addressStreet: {type: 'string'},
      addressCityStateZip: {type: 'string'},
      accountNumber: {type: 'string'},
      routingNumber: {type: 'string'},
      dueDate: {type: 'string', format: 'date-time'},
      total: {type: 'number'},
      lineItems: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            quantity: {type: 'number'},
            description: {type: 'string'},
            price: {type: 'number'},
            subtotal: {type: 'number'}
          },
        }
      }
    },
    required: ['id', 'invoiceNumber']
  }

module.exports = schemaInvoices;
