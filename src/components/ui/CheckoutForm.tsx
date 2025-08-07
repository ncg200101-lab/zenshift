import { CheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe  } from '@stripe/stripe-js';
import CheckoutComponent from './CheckoutComponent';

const stripePromise = loadStripe(`pk_test_51Rgrh93T5FbZuPOdE4BCOM8K2qji0kivAxaCwK3AQwMaTLj54awtW0xsIbqcTwVDijIVTc5xw6XjdBywMPDcnMuz008Kg0KjMD`);

const fetchClientSecret = () => {
    return fetch('/api/subscription/create-checkout-product-session', {method: 'POST'})
      .then((response) => response.json())
      .then((json) => json.checkoutSessionClientSecret)
};

const CheckoutForm = () => {

    return (
        <CheckoutProvider stripe={stripePromise} options={{fetchClientSecret}}>
            <CheckoutComponent />
        </CheckoutProvider>
        
    )
};

export default CheckoutForm;