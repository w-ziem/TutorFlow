import React from 'react';
import {FaCheckDouble} from "react-icons/fa";

const Pricing = () => {
    const plans = [
        {
            title: "Starter",
            price: 0,
            maxStudents: 1,
            features: [
                "Jeden aktywny uczeń",
                "30 notatek z lekcji",
                "Planowanie lekcji w kalendarzu",
                "Podstawowe powiadomienia e-mail",
                "Podstawowe statystyki (ilość lekcji, suma opłat)",
                "Dostęp z telefonu i komputera"
            ]
        },
        {
            title: "Standard",
            price: 49,
            maxStudents: "10",
            features: [
                "Do 10 aktywnych uczniów",
                "100 notatek z lekcji",
                "Automatyczne przypomnienia SMS i e-mail",
                "3 AI Summary w miesiącu",
                "Integracja z tablicą online do przeprowadzania lekcji",
                "Historia płatności i raporty miesięczne",
            ]
        },
        {
            title: "Pro",
            price: 99,
            maxStudents: "Bez limitu",
            features: [
                "Brak limitu uczniów",
                "Bez limitu notatek",
                "Bez limitu AI Summary",
                "Własna domena i branding (logo, kolory)",
                "Zaawansowana analityka (frekwencja, zarobki, trendy)",
                "Obsługa płatności online w wielu walutach",
                "Automatyczne wiadomości follow-up po lekcji",
                "Priorytetowe wsparcie 24/7"
            ]
        }
    ];


    return (
        <section id="pricing" className="py-16 px-4 max-w-[1600px] flex justify-center flex-wrap gap-8 mx-auto">
            {plans.map((plan, index) => {
                const isPopular = index === 1;
            
            return (
                <div 
                    key={index} 
                    className={`relative p-6 rounded-2xl shadow-2xl shadow-secondary flex flex-col gap-4 height-auto w-[30rem] transition-all duration-500 ${
                        isPopular 
                            ? 'bg-white border-2 border-secondary shadow-secondary shadow-2xl transform scale-105' 
                            : 'bg-white hover:bg-secondary/10'
                    }`}
                >
                    {isPopular && (
                        <>
                            <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-accent/5 rounded-2xl"></div>
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                <span className="bg-gradient-to-r from-secondary to-accent px-4 py-1 rounded-full text-white text-sm font-semibold shadow-lg">
                                    🔥 Najlepsza oferta
                                </span>
                            </div>
                        </>
                    )}
                    
                    <div className="relative z-10">
                        <h3 className={`text-4xl font-semibold ${isPopular ? 'text-secondary' : 'text-secondary'}`}>
                            {plan.title}
                        </h3>
                        
                        <p className="text-text text-2xl font-bold">
                            <span className="line-through text-text-secondary">{plan.price + 100}</span> 
                            <span className={isPopular ? 'text-accent' : ''}> {plan.price}zł</span>
                            {isPopular && <span className="text-sm text-accent ml-2">(-{((100/(plan.price + 100)) * 100).toFixed(0)}%)</span>}
                        </p>
                        
                        {plan.features.map((feature, featureIndex) => {
                            return (
                                <p key={featureIndex} className="text-text text-xl">
                                    <FaCheckDouble className={`mr-2 inline-block align-middle ${isPopular ? 'text-secondary' : 'text-gray-600'}`}/>
                                    {feature}
                                </p>
                            )
                        })}
                    </div>
                </div>
            )
        })}
    </section>
);
};

export default Pricing;