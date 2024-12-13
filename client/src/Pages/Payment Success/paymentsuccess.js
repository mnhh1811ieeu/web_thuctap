import React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('resultCode');

    return (
        <div className="payment-status">
            {status === '0' ? (
                <div>
                    <h1>Payment Successful!</h1>
                    <p>Thank you for your purchase. Your order has been processed successfully.</p>
                </div>
            ) : (
                <div>
                    <h1>Payment Failed</h1>
                    <p>We encountered an issue with your payment. Please try again or contact support.</p>
                </div>
            )}
        </div>
    );
};

export default PaymentSuccess;
