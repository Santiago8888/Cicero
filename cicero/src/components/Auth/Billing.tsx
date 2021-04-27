import { Elements, useStripe, useElements, CardExpiryElement, CardNumberElement, CardCvcElement } from '@stripe/react-stripe-js'
import { loadStripe, StripeCardNumberElement, StripeCardNumberElementChangeEvent } from '@stripe/stripe-js'
import { useEffect, useState, useMemo, FormEvent } from "react"
import '../../Stripe.css'


const useResponsiveFontSize = () => {
    const getFontSize = () => (window.innerWidth < 450 ? "16px" : "18px")
    const [fontSize, setFontSize] = useState(getFontSize)

    useEffect(() => {
        const onResize = () => { setFontSize(getFontSize()) }
        window.addEventListener("resize", onResize)
        return () => { window.removeEventListener("resize", onResize) }
    })

    return fontSize
}


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE as string)
const useOptions = () => {
    const fontSize = useResponsiveFontSize()
    const options = useMemo(
        () => ({
            style: {
                base: {
                    fontSize,
                    color: "#424770",
                    letterSpacing: "0.025em",
                    fontSmoothing: "antialiased",
                    fontFamily: "Source Code Pro, monospace",
                    "::placeholder": { color: "#aab7c4" }
                },
                invalid: { 
                    color: "#9e2146",
                    iconColor: "#fa755a"
                }
            },
            showIcon:true
        }), [fontSize]
    )

  return options
}

const CardForm = () => {
    const [succeeded, setSucceeded] = useState(false)
    const [error, setError] = useState<string>()
    const [processing, setProcessing] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState('')

    const stripe = useStripe()
    const elements = useElements()
    const options = useOptions()

    useEffect(() => {
        window.fetch("/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({items: [{ id: "xl-tshirt" }]})
        })
        .then(res => res.json())
        .then(({clientSecret}) => setClientSecret(clientSecret))
    }, [])

    const handleChange = async (event:StripeCardNumberElementChangeEvent) => {
        setDisabled(event.empty)
        setError(event.error ? event.error.message : "")
    }


    const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setProcessing(true)

        if (!stripe || !elements) return

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: { 
                card: elements.getElement(CardNumberElement) as StripeCardNumberElement 
            }
        })

        console.log("[PaymentMethod]", payload)

        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`)
            setProcessing(false)

        } else {
            setError('')
            setProcessing(false)
            setSucceeded(true)
        }
    }


    return <form id="payment-form" onSubmit={handleSubmit}>
        <label> Card number
            <CardNumberElement options={options} onChange={handleChange}/>
        </label>

        <label> Expiration date
            <CardExpiryElement options={options} />
        </label>

        <label> CVC
            <CardCvcElement options={options} />
        </label>

        <button disabled={processing || disabled || succeeded} id="submit" >
            <span id="button-text">
                {processing ? <div className="spinner" id="spinner"></div> : "Pay now" }
            </span>
        </button>

        { error && <div className="card-error" role="alert"> {error} </div> }
        <p className={succeeded ? "result-message" : "result-message hidden"}>
            Payment succeeded, see the result in your
            <a href={`https://dashboard.stripe.com/test/payments`}>
                {" "}
                Stripe dashboard.
            </a> Refresh the page to pay again.
        </p>

    </form>
}


export const Billing = () => <Elements stripe={stripePromise}>
    <CardForm />
</Elements>
