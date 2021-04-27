import { Elements, useStripe, useElements, CardExpiryElement, CardNumberElement, CardCvcElement } from '@stripe/react-stripe-js'
import { loadStripe, StripeCardNumberElement } from '@stripe/stripe-js'
import { useEffect, useState, useMemo, FormEvent } from "react"


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


const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx')

const useOptions = () => {
    const fontSize = useResponsiveFontSize()
    const options = useMemo(
        () => ({
            style: {
                base: {
                    fontSize,
                    color: "#424770",
                    letterSpacing: "0.025em",
                    fontFamily: "Source Code Pro, monospace",
                    "::placeholder": { color: "#aab7c4" }
                },
                invalid: { color: "#9e2146" }
            },
            showIcon:true
        }), [fontSize]
    )

  return options
}

const CardForm = () => {
    const stripe = useStripe()
    const elements = useElements()
    const options = useOptions()

    const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!stripe || !elements) return

        const payload = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardNumberElement) as StripeCardNumberElement
        })

        console.log("[PaymentMethod]", payload)
    }

    return <form onSubmit={handleSubmit}>
        <label> Card number
            <CardNumberElement options={options} />
        </label>

        <label> Expiration date
            <CardExpiryElement options={options} />
        </label>

        <label> CVC
            <CardCvcElement options={options} />
        </label>

        <button type="submit" disabled={!stripe}> Pay </button>      
    </form>
}


export const Billing = () => <Elements stripe={stripePromise}>
    <CardForm />
</Elements>
