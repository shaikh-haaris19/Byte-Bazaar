import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const Verify = () => {
    const router = useRouter();
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    }, []);

    const verifyPayment = async (orderId, success) => {
        try {
            if (!token) return;

            const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/getUserId`, { token });
            const userId = res.data.userId;

            const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/verifyStripe`, {
                orderId,
                success,
                userId,
            });

            if (response.data.success) {
                router.push('/order?id='+orderId+'&clearCart=true');
            } else {
                router.push('/checkout');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (router.isReady) {
            const { success, orderId } = router.query;
            verifyPayment(orderId, success);
        }
    }, [router.isReady]);

    return <div>Verifying your payment...</div>;
};

export default Verify;
