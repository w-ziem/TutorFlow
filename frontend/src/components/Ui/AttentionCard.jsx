import {BookOpen, Clock, CreditCard, DollarSign, Info, TrendingDown} from "lucide-react";
import {formatDate} from "../../utils/HelperFunctions.js";
import React from "react";
import {useNavigate} from "react-router-dom";


const getCardConfig = (type) => {
    switch (type) {
        case 'INFO':
            return {
                icon: Clock,
                color: 'text-blue-400',
                bgColor: 'bg-blue-500/10',
                borderColor: 'border-blue-500/20',
                gradientFrom: 'from-blue-500/5',
                gradientTo: 'to-cyan-500/5'
            };
        case 'PAYMENT':
            return {
                icon: CreditCard,
                color: 'text-red-400',
                bgColor: 'bg-red-500/10',
                borderColor: 'border-red-500/20',
                gradientFrom: 'from-red-500/5',
                gradientTo: 'to-orange-500/5'
            };
        case 'PERFORMANCE':
            return {
                icon: TrendingDown,
                color: 'text-orange-400',
                bgColor: 'bg-orange-500/10',
                borderColor: 'border-orange-500/20',
                gradientFrom: 'from-orange-500/5',
                gradientTo: 'to-yellow-500/5'
            };
        default:
            return {
                icon: Info,
                color: 'text-gray-400',
                bgColor: 'bg-gray-500/10',
                borderColor: 'border-gray-500/20',
                gradientFrom: 'from-gray-500/5',
                gradientTo: 'to-gray-500/5'
            };
    }
};




const AttentionCard = ({ item }) => {
    const config = getCardConfig(item.type);
    const IconComponent = config.icon;
    const {data} = item;
    const navigation = useNavigate();

    const handleRedirect = () => {
        switch (item.type) {
            case 'INFO':
                navigation(`students/${data.studentId}`);
                break;
            case 'PAYMENT':
                navigation(`students/${data.studentId}`);
                break;
            case 'PERFORMANCE':
                navigation(`lessons/${data.lessonId}`);
                break;
        }
    };

    return (
        <div className={`relative p-6 rounded-2xl backdrop-blur-sm border ${config.borderColor} hover:scale-[1.02] transition-all duration-300`}>
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo} opacity-30`}></div>

            <div className="relative z-10">
                <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${config.bgColor} backdrop-blur-sm`}>
                        <IconComponent className={`w-6 h-6 ${config.color}`} />
                    </div>

                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-text mb-2">{item.title}</h3>
                        <p className="text-text/70 mb-4 leading-relaxed">{item.description}</p>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-text/50" />
                                <span className="text-sm font-medium text-text/80">{item.student}</span>
                            </div>

                            <button onClick={handleRedirect} className={`px-4 py-2 rounded-lg ${config.bgColor} ${config.color} backdrop-blur-sm border cursor-pointer ${config.borderColor} hover:scale-105 transition-all duration-200 text-sm font-medium`}>
                                {item.actionText}
                            </button>
                        </div>

                        {/* Dodatkowe informacje w zależności od typu */}
                        <div className="mt-3 pt-3 border-t border-white/10">
                            {item.type === 'info' && (
                                <div className="flex items-center gap-2 text-sm text-text/60">
                                    <Clock className="w-4 h-4" />
                                    <span>Ostatnia lekcja: {item.days} dni temu</span>
                                </div>
                            )}

                            {item.type === 'PAYMENT' && (
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2 text-text/60">
                                        <DollarSign className="w-4 h-4" />
                                        <span>{data.lessonsCount} nieopłaconych lekcji</span>
                                    </div>
                                    <span className="text-red-400 font-medium">{data.daysOverdue} dni opóźnienia</span>
                                </div>
                            )}

                            {item.type === 'PERFORMANCE' && (
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2 text-text/60">
                                        <TrendingDown className="w-4 h-4" />
                                        <span>Data lekcji: {formatDate(data.lessonDate)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-orange-400 font-bold text-lg">{data.grade}/10</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttentionCard;