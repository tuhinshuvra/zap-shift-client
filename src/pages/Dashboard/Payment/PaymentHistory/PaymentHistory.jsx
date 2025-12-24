import React from 'react';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../../shared/loader/Loader';
import { FaCopy, FaCreditCard } from 'react-icons/fa';
import Swal from 'sweetalert2';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();


    const { isPending, data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure(`/payments?email=${user?.email}`)
            return res.data;
        }
    })

    console.log("Payment History : ", payments);

    if (isPending) {
        return <Loader></Loader>
    }

    const handleCopy = (id) => {
        navigator.clipboard.writeText(id);
        Swal.fire({
            icon: 'success',
            title: 'Copied!',
            text: 'Transaction ID copied to clipboard',
            timer: 1500,
            showConfirmButton: false
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">💳 Payment History</h2>

            <div className="overflow-x-auto rounded-xl shadow-lg">
                <table className="table table-zebra">
                    <thead className="bg-base-300">
                        <tr className="text-center font-bold italic text-black  ">
                            <th>SL</th>
                            <th>Parcel</th>
                            <th>Amount</th>
                            <th>Transaction ID</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payments.map((pay, index) => (
                            <tr key={pay._id} className="text-center hover">
                                <td>{index + 1}</td>

                                <td> {pay?.transactionId ? pay.transactionId : 'N/A'}</td>

                                <td className="font-bold text-primary flex justify-center items-center gap-1">
                                    <FaCreditCard /> {pay.paymentMethod[0]} ${pay.amount}
                                </td>

                                <td className="flex justify-center gap-2 items-center">

                                </td>

                                <td className="font-mono text-xs">
                                    {pay?.parcelId ? `${pay.parcelId}` : 'N/A'}
                                </td>

                                <td>
                                    {new Date(pay.paidAt).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {payments.length === 0 && (
                <p className="text-center mt-6 text-gray-500">
                    No payment history found 🥲
                </p>
            )}
        </div>
    );
};

export default PaymentHistory;