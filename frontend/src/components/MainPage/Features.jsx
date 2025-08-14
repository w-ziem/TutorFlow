import learning from "../../assets/nauczanie.svg";
import ai from "../../assets/ai.svg";
import calendar from "../../assets/calendar.svg";
import relation from "../../assets/realtion.svg";

export default function Features() {
    const features = [
        {
            title: "Zero chaosu\n",
            description: "Uczniowie, terminy i notatki – zawsze pod ręką",
            image: learning,
            bubble: "from-blue-400 to-sky-400"
        },
        {
            title: "Skup się na uczeniu, my ogarniemy resztę\n",
            description: "Z pomocą AI twórz plany nauki oraz podsumowania o uczniach",
            image: ai,
            bubble: "from-orange-400 to-pink-400"
        },
        {
            title: "Lekcje dopięte na ostatni guzik\n",
            description: "Harmonogram, powiadomienia i płatności z jednego miejsca",
            image: calendar,
            bubble: "from-green-400 to-teal-400"
        },
        {
            title: "Relacje z uczniami",
            description: "Historia postępów i szybkie notatki po każdej lekcji – zawsze dostępne",
            image: relation,
            bubble: "from-purple-400 to-blue-400"
        },
    ];

    return (
        <section id="features" className="py-16 px-4 max-w-6xl mx-auto relative">
            <div className="text-center mb-12">
                <h2 className="text-5xl font-bold text-gray-900">Dlaczego warto wybrać TutorFlow?</h2>
                <p className="text-gray-600 mt-2 text-lg">Narzędzia, które uwalniają Twój czas i pomagają skupić się na tym, co najważniejsze – na uczeniu</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                    <div key={index} className="relative rounded-2xl shadow-lg p-8 bg-white overflow-hidden">

                        {/* Bańka w tle */}
                        <div
                            className={`absolute left-20 w-100 h-100 bg-gradient-to-br ${feature.bubble} rounded-full blur-3xl opacity-30`}
                        ></div>

                        <div className="relative z-10 flex flex-col items-center text-center">
                            <img
                                src={feature.image}
                                alt={feature.title}
                                className="w-32 h-32 object-contain mb-6"
                            />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-gray-700">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
