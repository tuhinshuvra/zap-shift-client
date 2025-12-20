import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loader from '../../../shared/loader/Loader';
import useAuth from '../../../hooks/useAuth';

const PaymentForm = () => {
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { parcelId } = useParams();
    console.log("Payment Form Parcel ID : ", parcelId);

    const [error, setError] = useState('');

    const { isPending, data: parcelInfo = {} } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`)
            return res.data;
        }

    })

    // console.log("Parcel INfo : ", parcelInfo);
    const payAmount = parcelInfo?.cost;

    if (isPending) {
        return <Loader></Loader>
    }

    const amount = parcelInfo.cost;
    const amountInCents = amount * 100;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return
        }

        // Step-1 : validate the card
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
            console.log('[error]', error);
        } else {
            setError('');
            console.log('[PaymentMethod]', paymentMethod);

            // Step-2 : create payment intent
            const res = await axiosSecure.post('/create-payment-intent', {
                amount: amountInCents,
                parcelId
            })

            const clientSecret = res.data.clientSecret;

            // Step-3: Confirm Payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email,
                    },
                },
            });

            if (result.error) {
                setError(result.error.message);
            } else {
                setError('');
                if (result.paymentIntent.status === 'succeeded') {
                    console.log('Payment Succeeded : ', result);

                }
            }
            // console.log("Response form create payment intent ", res);
        }


    }

    return (
        <div>
            <form onSubmit={handleSubmit} className=' my-4 space-y-4 bg-white p-8 rounded-xl shadow-2xl w-full max-w-md mx-auto'>
                <CardElement className=' p-2 border rounded'>
                </CardElement>
                <button
                    type='submit'
                    className='btn btn-success text-black w-full'
                    disabled={!stripe}
                >
                    Pay ৳{payAmount}
                </button>
                {
                    error && <p className=' text-red-600 font-bold italic'>{error}</p>
                }
            </form>
        </div>
    );
};
export default PaymentForm;