import React, {useEffect, useState} from 'react';
import {AlertCircle, CheckCircle, CreditCard} from "lucide-react";
import {useAuth} from "../../contexts/AuthProvider.jsx";
import {NavLink} from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.jsx";

const PaymentStatus = () => {
    const [paymentStatus, setPaymentStatus] = useState({
        hasUnpaidLessons: "",
        unpaidCount: "",
    });

    const {userId} = useAuth();

    useEffect(() => {
        const fetchPaymentStatus = async () => {
            console.log(userId);
            const res = await axiosInstance.get(`/stats/payment/${userId}`);
            const data = res.data;
            setPaymentStatus(data);
        }
        fetchPaymentStatus();
    }, [userId])



    return (
    <div className="relative p-6 rounded-2xl bg-gradient-to-r from-white/8 to-white/4 backdrop-blur-xl border border-white/10 shadow-xl mt-8">
        <div className={`absolute inset-0 rounded-2xl ${paymentStatus.hasUnpaidLessons ? 'bg-gradient-to-r from-red-500/5 to-orange-500/5' : 'bg-gradient-to-r from-green-500/5 to-emerald-500/5'}`}></div>
        <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-xl backdrop-blur-sm ${paymentStatus.hasUnpaidLessons ? 'bg-red-500/10' : 'bg-green-500/10'}`}>
                    {paymentStatus.hasUnpaidLessons ? (
                        <AlertCircle className="w-7 h-7 text-red-400" />
                    ) : (
                        <CheckCircle className="w-7 h-7 text-green-400" />
                    )}
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-text">Status płatności</h2>
                    <p className="text-text/60">
                        {paymentStatus.hasUnpaidLessons
                            ? 'Wymagają uwagi'
                            : 'Wszystko opłacone'
                        }
                    </p>
                </div>
            </div>

            {paymentStatus.hasUnpaidLessons ? (
                <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <CreditCard className="w-5 h-5 text-red-400" />
                                <span className="text-text font-medium">
                                    {paymentStatus.unpaidCount} nieopłaconych lekcji
                                </span>
                            </div>
                            <NavLink to="/dashboard-student/lessons" className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-200 text-sm font-medium">
                                Opłać teraz
                            </NavLink>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-text font-medium">
                            Świetnie! Wszystkie lekcje są opłacone ✨
                        </span>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
}

export default PaymentStatus;