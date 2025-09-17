import React, { useState, useEffect } from 'react';
import { AlertTriangle, Info, DollarSign, TrendingDown, ChevronLeft, ChevronRight, Clock, CreditCard, BookOpen } from 'lucide-react';
import axiosInstance from "../../utils/axiosInstance.jsx";
import AttentionCard from "../Ui/AttentionCard.jsx";

const AttentionRequired = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [attentionItems, setAttentionItems] = useState([]);

    const fetchAttentionItems = async () => {
        try {
            const response = await axiosInstance.get("/stats/attention");
            const data = await response.data;
            setAttentionItems(data);
        } catch (err) {
            console.log("Error fetching attention items: " + err.message);
        }
    };

    useEffect(() => {
        fetchAttentionItems();
    }, []);

    const nextItem = () => {
        if (currentIndex < attentionItems.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevItem = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const goToItem = (index) => {
        setCurrentIndex(index);
    };


    if (attentionItems.length === 0) {
        return (
            <div className="mt-8">
                <div className="relative p-6 rounded-2xl bg-gradient-to-r from-white/8 to-white/4 backdrop-blur-xl border border-white/10 shadow-xl">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/5 to-emerald-500/5"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 rounded-xl bg-green-500/10 backdrop-blur-sm">
                                <Info className="w-7 h-7 text-green-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-text">Wymagające uwagi</h2>
                                <p className="text-text/60">Wszystko pod kontrolą!</p>
                            </div>
                        </div>

                        <div className="text-center py-8">
                            <p className="text-text/70 text-lg">Nie ma elementów wymagających Twojej uwagi 🎉</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-8">
            <div className="relative p-6 rounded-2xl bg-gradient-to-r from-white/8 to-white/4 backdrop-blur-xl border border-white/10 shadow-xl min-h-[280px]">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/5 to-orange-500/5"></div>

                <div className="relative z-10 h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 rounded-xl bg-amber-500/10 backdrop-blur-sm">
                            <AlertTriangle className="w-7 h-7 text-amber-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-text">Wymagające uwagi</h2>
                            <p className="text-text/60">Elementy, które mogą potrzebować Twojej interwencji</p>
                        </div>
                    </div>

                    {/* Item Display Area */}
                    <div className="flex-1 relative overflow-hidden">
                        <div
                            className="flex transition-transform duration-300 ease-in-out h-full"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {attentionItems.map((item, _) => (
                                <div key={item.id} className="w-full flex-shrink-0">
                                    <AttentionCard item={item} />
                                </div>
                            ))}
                        </div>

                        {/* Navigation Arrows */}
                        {attentionItems.length > 1 && (
                            <>
                                <button
                                    onClick={prevItem}
                                    disabled={currentIndex === 0}
                                    className={`absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-200 ${
                                        currentIndex === 0
                                            ? 'bg-gray-300/20 text-gray-400 cursor-not-allowed'
                                            : 'bg-white/20 hover:bg-white/30 text-text backdrop-blur-sm hover:scale-105'
                                    }`}
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={nextItem}
                                    disabled={currentIndex === attentionItems.length - 1}
                                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-200 ${
                                        currentIndex === attentionItems.length - 1
                                            ? 'bg-gray-300/20 text-gray-400 cursor-not-allowed'
                                            : 'bg-white/20 hover:bg-white/30 text-text backdrop-blur-sm hover:scale-105'
                                    }`}
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Dots Navigation */}
                    {attentionItems.length > 1 && (
                        <div className="flex justify-center gap-2 mt-4 flex-shrink-0">
                            {attentionItems.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToItem(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                        index === currentIndex
                                            ? 'bg-amber-500 scale-125'
                                            : 'bg-text/30 hover:bg-text/50'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AttentionRequired;