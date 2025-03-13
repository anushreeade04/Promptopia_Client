import React, { useContext, useState } from 'react';
import { assets, plans } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ amount, credits, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user, setUser } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    
    const response = await fetch("http://localhost:4000/api/payment/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const { clientSecret } = await response.json();

    if (!clientSecret) {
      setError("Failed to initiate payment.");
      setLoading(false);
      return;
    }

    // Confirm the payment
    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) },
    });

    if (error) {
      setError(error.message);
    } else {
      alert("Payment Successful!");
      await updateCredits(user._id, credits); // Update user's credits
      onSuccess(); // Close the payment modal
    }
    setLoading(false);
  };

  // Function to update user credits after successful payment
  const updateCredits = async (userId, creditsToAdd) => {
    try {
      const res = await fetch("http://localhost:4000/api/user/update-credits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, credits: creditsToAdd }),
      });

      const data = await res.json();
      if (data.success) {
        setUser((prevUser) => ({ ...prevUser, credits: prevUser.credits + creditsToAdd }));
      } else {
        console.error("Failed to update credits:", data.message);
      }
    } catch (err) {
      console.error("Error updating credits:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <CardElement />
      <button type="submit" disabled={!stripe || loading} className="mt-4 bg-blue-500 text-white p-2 rounded">
        {loading ? "Processing..." : "Pay"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

const BuyCredit = () => {
  const { user } = useContext(AppContext);
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <div className='min-h-[80vh] text-center pt-14 mb-10'>
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>Our Plans</button>
      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Choose a Plan</h1>

      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((item, index) => (
          <div key={index} className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500'>
            <img width={120} src={assets.logo_icon2 } alt="" className='ml-10' />
            <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
            <p className='text-sm'>{item.desc}</p>
            <p className='mt-6'>
              <span className='text-3xl font-medium'>${item.price}</span>/ {item.credits} credits
            </p>
            <button
              className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52'
              onClick={() => setSelectedPlan(item)}
            >
              {user ? 'Purchase' : 'Get Started'}
            </button>
          </div>
        ))}
      </div>

      {selectedPlan && (
        <div className="mt-10 p-6 border rounded-lg bg-gray-100">
          <h3 className="text-xl font-semibold mb-4">Complete Payment for {selectedPlan.credits} credits</h3>
          <Elements stripe={stripePromise}>
            <CheckoutForm amount={selectedPlan.price} credits={selectedPlan.credits} onSuccess={() => setSelectedPlan(null)} />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default BuyCredit;


