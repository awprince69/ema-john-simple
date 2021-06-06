import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ShopCardForm from './ShopCardForm';
import SplitCardForm from './SplitCardForm';

const stripePromise = loadStripe('pk_test_51IeD30JJPqx0nbsmlRiQaUmqHjBKZRcbdFKLHPltreZk0OrlES3KwsL6hXiYWw7lYDpDGpjPejozPjIAYaFn3W7n00igfwDrVu');
const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
            <SplitCardForm handlePayment={handlePayment}></SplitCardForm>
        </Elements>
    );
};

export default ProcessPayment;