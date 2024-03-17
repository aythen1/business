const Stripe = require('stripe');

const acc = 'acct_1OvL9r2ZkHdjC5vH'

const publishableKey = 'sk_test_51NusVhJxrGNMjw0dD0NzjtN4hQu6wC0lo638j8r5DzJo4MwYoMHZEHiJWksyCT5dPLaFFgd76v9sL774LZ3PrBWu00s0FdwRSw'

class StripeService {
  constructor() {
    this.stripe = new Stripe(
    //   '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',
    publishableKey
    );
  }

  /*
amount: Es el monto de la transferencia, expresado en la moneda especificada en el parámetro currency.
currency: Es la moneda en la que se realizará la transferencia. Debes proporcionar el código de tres letras de la moneda (por ejemplo, 'eur' para euros).
destination: Es la cuenta receptora de la transferencia. Debes proporcionar el ID de la cuenta destinataria en Stripe.
transfer_group (opcional): Permite agrupar las transferencias en una sola transacción para mantener la contabilidad y el historial. Puede ser útil cuando deseas transferir fondos a múltiples destinatarios en una sola operación.
 */
  

  async createPaymentSession() {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: 10000,
        currency: 'usd',
        transfer_group: 'ORDER10',
      });
      return paymentIntent;
    } catch (error) {
      throw error;
    }
  }

  async createExpressAccount() {
    try {
      const account = await this.stripe.accounts.create({
        type: 'express',
      });
      return account;
    } catch (error) {
        console.log('error', error)
      throw error;
    }
  }

  async createAccountLink(acc) {
    try {
      const accountLink = await this.stripe.accountLinks.create({
        account: acc,
        refresh_url: 'https://example.com/reauth',
        return_url: 'https://example.com/return',
        type: 'account_onboarding',
      });
      return accountLink;
    } catch (error) {
        console.log('ewdwrf', error)
      throw error;
    }
  }

  /*

  */
  async createPaymentSheet(price, email) {
    try {
      const customer = await this.stripe.customers.create();
      const ephemeralKey = await this.stripe.ephemeralKeys.create(
        { customer: customer.id },
        { apiVersion: '2023-10-16' },
      );
      const gr = 'group1';
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: price,
        currency: 'usd',
        customer: customer.id,
        description: 'Gracias por tu compra!',
        receipt_email: email,
        automatic_payment_methods: {
          enabled: true,
        },
        transfer_group: gr,
      });
      return {
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
        publishableKey
          
      };
    } catch (error) {
      throw error;
    }
  }

  async createTransfer(amount, group, destination) {
    try {
      const transfer = await this.stripe.transfers.create({
        amount,
        currency: 'eur',
        destination,
        transfer_group: group,
      });
      return transfer;
    } catch (error) {
      throw error;
    }
  }


  async addDebitCardToAccount(accountId, debitCardDetails) {
    try {
      // Primero, crea una fuente de pago utilizando los detalles de la tarjeta de débito
      const source = await this.stripe.paymentMethods.create({
        type: 'card',
        card: {
          number: debitCardDetails.number,
          exp_month: debitCardDetails.exp_month,
          exp_year: debitCardDetails.exp_year,
          cvc: debitCardDetails.cvc,
        },
      });

      console.log('cardd', source)
  
      // Luego, adjunta la fuente de pago a la cuenta especificada
    //   await this.stripe.accounts.createExternalAccount(accountId, {
    //     external_account: source.id,
    //   });
     // Luego, adjunta la fuente de pago a la cuenta especificada


      const resp = await this.stripe.accounts.createExternalAccount(accountId, {
        external_account: source.id,
        default_for_currency: true, // Opcional: Establece esta tarjeta como predeterminada para la moneda de la cuenta
      });

      console.log('resp', resp)
  
      
      return { success: true, message: 'Tarjeta de débito agregada exitosamente a la cuenta.' };
    } catch (error) {
      console.log('Error al agregar tarjeta de débito:', error);
      throw error;
    }
  }




  async handlePaymentSuccess() {
    // Lógica para manejar el éxito de la transacción de pago
  }

  async handlePaymentCancel() {
    // Lógica para manejar la cancelación de la transacción de pago
  }
}


module.exports = { StripeService };