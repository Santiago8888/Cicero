const { stripe_key } = process.env

exports.handler = async () => {
    const stripe = require('stripe')(stripe_key)
    const { client_secret } = await stripe.paymentIntents.create({ amount: 400*100, currency: 'usd' })
	return { statusCode:200, body:JSON.stringify(client_secret) }
}
