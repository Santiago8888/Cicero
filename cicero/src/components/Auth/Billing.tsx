import { useStripe, useElements, CardExpiryElement, CardNumberElement, CardCvcElement } from '@stripe/react-stripe-js'
import { StripeCardNumberElement, StripeCardNumberElementChangeEvent } from '@stripe/stripe-js'
import { useState, useMemo, FormEvent } from "react"
import { useMediaQuery } from 'react-responsive'

import { iLanding } from './Landing'
import { iNewUser } from './SignUp'

import '../../Stripe.css'


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


interface iBilling extends iLanding { clientSecret?:string, newUser:iNewUser }
export const Billing = ({clientSecret, newUser, createUser}: iBilling) => {
    const smallScreen = useMediaQuery({ query: '(max-width: 600px)' })

    const [ error, setError ] = useState<string>()
    const [ disabled, setDisabled ] = useState(true)
    const [ succeeded, setSucceeded ] = useState(false)
    const [ processing, setProcessing ] = useState(false)

    const stripe = useStripe()
    const elements = useElements()
    const options = useOptions()

    const handleChange = async ({ complete, error }:StripeCardNumberElementChangeEvent) => {
        setDisabled(!complete)
        setError(error ? error.message : "")
    }


    const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setProcessing(true)

        if (!stripe || !elements || !clientSecret) return

        const card = elements.getElement(CardNumberElement) as StripeCardNumberElement
        const payload = await stripe.confirmCardPayment(clientSecret,{payment_method:{card}})

        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`)
            setProcessing(false)

        } else {
            setError('')
            setProcessing(false)
            setSucceeded(true)
            createUser(newUser)
        }
    }


    return <div className="content">
        <div style={{display:'table', margin:'auto', minHeight:'calc(100vh - 120px - 6rem)', marginTop:'-3rem'}}>
            <div  style={{display:'table-cell', verticalAlign:'middle'}}>
                <h1 style={{fontSize:!smallScreen ? '3rem' : '2rem', marginBottom:'1rem', color:'darkblue'}}> 
                    ASTROCONSCIENCIA 
                </h1>

                <h3 
                    style={{
                        margin:'0rem auto 3rem',
                        color: '#555',
                        fontSize: '1.25em',
                        textAlign: 'center',
                        fontWeight: 500,
                        width: !smallScreen ? 500 : 300        
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
                        disabled={processing || disabled || succeeded || !clientSecret} 
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
