const { catchedAsync, response } = require("../utils/err");

const express = require('express');
const { StripeService } = require('../services/stripe');

const app = express();
const port = 3000;

app.use(express.json());

const stripeService = new StripeService();




// ------------------------------------------------------
const suscription = async (req, res) => {
    try {

        return res.status(200).send([])
    } catch (err) {
        return res.status(200).send([])
    }
}


const suscriptionDeny = async (req, res) => {
    try {

        return res.status(200).send([])
    } catch (err) {
        return res.status(200).send([])
    }
}


// ------------------------------------------------------

const addMethodCard = async (req, res) => {
    try {

        const acc = 'acct_1OvLQsFK6PmPnbY2'
        const debitCardDetails = {
            number: '4242424242424242',
            exp_month: '04',
            exp_year: '24',
            cvc: '123',
        }
        
        const session = await stripeService.addDebitCardToAccount(acc, debitCardDetails);
        console.log('session', session)
        res.json(session);

    } catch (err) {
        return res.status(200).send([])
    }
}


const deleteMethodCard = async (req, res) => {
    try {
        return res.status(200).send([])
    } catch (err) {
        return res.status(200).send([])
    }
}


// ------------------------------------------------------

const fetchsSuscription = async (req, res) => {
    try {

        return res.status(200).send([])
    } catch (err) {
        return res.status(200).send([])
    }
}

const fetchsCard = async (req, res) => {
    try {

        return res.status(200).send([])
    } catch (err) {
        return res.status(200).send([])
    }
}


// ------------------------------------------------------

const fetchResume = async (req, res) => {
    try {

        return res.status(200).send([])
    } catch (err) {
        return res.status(200).send([])
    }
}




//////////////////////////////////////

// app.post('/stripe/create-session', async (req, res) => {
const createSession = async (req, res) => {
    console.log('create session')
    try {
        const session = await stripeService.createPaymentSession();
        res.json(session);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// });

// app.post('/stripe/create-transfer', async (req, res) => {
const createTransfer = async (req, res) => {
    try {
        const { amount, group, destination } = req.body;
        const transfer = await stripeService.createTransfer(amount, group, destination);
        res.json(transfer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// });

// app.post('/stripe/create-express-account', async (req, res) => {
const createExpressAccount = async (req, res) => {
    console.log('createExpressAccount')
    try {
        const expressAccount = await stripeService.createExpressAccount();
        console.log('createExpressAccount', expressAccount)
        res.json(expressAccount);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// });

// app.post('/stripe/create-account-link', async (req, res) => {
const createAccountLink = async (req, res) => {
    try {
        const { acc } = req.body;
        console.log('wfirif', acc)
        const accountLink = await stripeService.createAccountLink(acc);

        console.log('link', accountLink)
        res.json(accountLink);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// });

// app.post('/stripe/payment-sheet', async (req, res) => {
const paymentSheet = async (req, res) => {
    try {
        const { price, email } = req.body;
        const paymentSheet = await stripeService.createPaymentSheet(price, email);
        console.log('ppp', paymentSheet)
        res.json(paymentSheet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// });

// app.get('/stripe/success', async (req, res) => {
const paymentSuccess = async (req, res) => {
    try {
        const success = await stripeService.handlePaymentSuccess();
        res.json(success);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// });

// app.get('/stripe/cancel', async (req, res) => {
const paymentCancel = async (req, res) => {
    try {
        const cancel = await stripeService.handlePaymentCancel();
        res.json(cancel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// });

//////////////////////////////////////






module.exports = {
    suscription: catchedAsync(suscription),
    suscriptionDeny: catchedAsync(suscriptionDeny),

    // addMethodCard: catchedAsync(addMethodCard),
    deleteMethodCard: catchedAsync(deleteMethodCard),
    addMethodCard: catchedAsync(addMethodCard),

    fetchsSuscription: catchedAsync(fetchsSuscription),
    fetchsCard: catchedAsync(fetchsCard),

    fetchResume: catchedAsync(fetchResume),

    //
    createExpressAccount: catchedAsync(createExpressAccount),
    createAccountLink: catchedAsync(createAccountLink),
    createSession: catchedAsync(createSession),
    createTransfer: catchedAsync(createTransfer),
    paymentSheet: catchedAsync(paymentSheet),
    paymentSuccess: catchedAsync(paymentSuccess),
    paymentCancel: catchedAsync(paymentCancel),
}




