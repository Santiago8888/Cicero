import { Elements, useStripe, useElements, CardExpiryElement, CardNumberElement, CardCvcElement } from '@stripe/react-stripe-js'
import { loadStripe, StripeCardNumberElement, StripeCardNumberElementChangeEvent } from '@stripe/stripe-js'
import { useEffect, useState, useMemo, FormEvent } from "react"
import { iLanding } from './Landing'
import { iLoginInput } from './Login'
import '../../Stripe.css'


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE as string)
const useOptions = () => {
    const options = useMemo(
        () => ({
            style: {
                base: {
                    fontSize:'22px',
                    color: "#424770",
                    letterSpacing: "0.025em",
                    fontSmoothing: "antialiased",
                    backgroundColor:'white',
                    fontFamily: "Source Code Pro, monospace",
                    "::placeholder": { color: "#aab7c4" }
                },
                invalid: { 
                    color: "#9e2146",
                    iconColor: "#fa755a"
                }
            },
            showIcon:true
        }), []
    )

    return options
}


const CardForm = ({mongoUser, loginInput:{email, password}, createUser}: iBilling) => {
    const [ error, setError ] = useState<string>()
    const [ disabled, setDisabled ] = useState(true)
    const [ succeeded, setSucceeded ] = useState(false)
    const [ processing, setProcessing ] = useState(false)
    const [ clientSecret, setClientSecret ] = useState('')

    const stripe = useStripe()
    const elements = useElements()
    const options = useOptions()

    useEffect(() => {
        mongoUser?.functions.paymentIntent()
        .then(({clientSecret}) => 
            setClientSecret(clientSecret)
        )
    }, [mongoUser])

    const handleChange = async ({ complete, error }:StripeCardNumberElementChangeEvent) => {
        setDisabled(!complete)
        setError(error ? error.message : "")
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

        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`)
            setProcessing(false)

        } else {
            setError('')
            setProcessing(false)
            setSucceeded(true)
            createUser({ email, password })

        }
    }


    return <div className="content">
        <div style={{display:'table', margin:'auto', minHeight:'calc(100vh - 120px - 6rem)', marginTop:'-3rem'}}>
            <div  style={{display:'table-cell', verticalAlign:'middle'}}>
                <h1 style={{fontSize:'3rem', marginBottom:'2rem', color:'darkblue'}}> ASTROCONSCIENCIA </h1>
                <h3 
                    style={{
                        margin:'0rem auto 3rem',
                        color: '#555',
                        fontSize: '1.25em',
                        textAlign: 'center',
                        fontWeight: 500,
                        width: 500        
                    }}
                >   Disfruta de acceso completo al curso de Astroconsciencia por un pago único de $400 USD. </h3>        

                <form id="payment-form" onSubmit={handleSubmit} style={{maxWidth:600, margin:'auto', textAlign:'left'}}>
                    <label className="label" style={{color:'#555'}}>  Número de Tarjeta: </label>
                    <div className="field">
                        <CardNumberElement options={options} onChange={handleChange}/>
                    </div>

                    <label className="label" style={{color:'#555'}}> Fecha de Expiración: </label>
                    <div className="field">
                        <CardExpiryElement options={options} />
                    </div>

                    <label className="label" style={{color:'#555'}}> CVC: </label>
                    <div className="field">
                        <CardCvcElement options={options} />
                    </div>

                    <button 
                        id="submit" 
                        className="stripeButton" 
                        style={{marginTop:'2.5rem'}}
                        disabled={processing || disabled || !clientSecret || succeeded} 
                    >
                        <span id="button-text">
                            {processing ? <div className="spinner" id="spinner"></div> : "Pagar" }
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
            </div>
        </div>
    </div>
}


interface iBilling extends iLanding { loginInput:iLoginInput }
export const Billing = ({mongoUser, loginInput, createUser }:iBilling) => <Elements stripe={stripePromise}>
    <CardForm mongoUser={mongoUser} loginInput={loginInput} createUser={createUser}/>
</Elements>
