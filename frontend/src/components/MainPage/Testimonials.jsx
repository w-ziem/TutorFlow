import React, { useEffect, useRef } from 'react';

export default function Testimonials() {
    const scrollRef = useRef(null);

    const testimonials = [
        {
            name: "Anna Kowalska",
            role: "Korepetytorka matematyki",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anna",
            quote: "TutorFlow całkowicie zmienił sposób, w jaki prowadzę korepetycje. Nie muszę już pamiętać o płatnościach ani gubić notatek o uczniach.",
            rating: 5
        },
        {
            name: "Piotr Wiśniewski",
            role: "Nauczyciel angielskiego",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Piotr",
            quote: "Wreszcie mogę skupić się na uczeniu, a nie na organizacji. Kalendarz i powiadomienia działają perfekcyjnie!",
            rating: 5
        },
        {
            name: "Magdalena Nowak",
            role: "Tutorka fizyki",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Magdalena",
            quote: "AI pomaga mi tworzyć spersonalizowane plany nauki. Moi uczniowie widzą wyraźne postępy, a ja oszczędzam godziny pracy.",
            rating: 5
        },
        {
            name: "Krzysztof Zieliński",
            role: "Korepetytor chemii",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Krzysztof",
            quote: "Historia postępów uczniów to coś, bez czego już nie mogę pracować. Widzę dokładnie, jak każdy z nich się rozwija.",
            rating: 5
        },
        {
            name: "Karolina Lewandowska",
            role: "Nauczycielka niemieckiego",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karolina",
            quote: "Prosta, intuicyjna aplikacja. Wszystko czego potrzebuję w jednym miejscu. Polecam każdemu tutorowi!",
            rating: 5
        },
        {
            name: "Tomasz Wójcik",
            role: "Korepetytor programowania",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tomasz",
            quote: "Zarządzanie wieloma uczniami nigdy nie było prostsze. TutorFlow to must-have dla każdego profesjonalnego tutora.",
            rating: 5
        }
    ];

    //for endless loop
    const doubledTestimonials = [...testimonials, ...testimonials];

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let scrollPosition = 0;
        const scrollSpeed = 0.5;
        let animationFrameId;

        const scroll = () => {
            scrollPosition += scrollSpeed;

            if (scrollPosition >= scrollContainer.scrollWidth / 2) {
                scrollPosition = 0;
            }

            scrollContainer.scrollLeft = scrollPosition;
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <section id="testimonials" className="py-16 px-4 relative overflow-hidden bg-gradient-to-b from-white to-indigo-50/30">
            <div aria-hidden="true" className="pointer-events-none absolute top-20 left-1/4 h-[30rem] w-[40rem] rounded-full bg-indigo-500/10 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 right-1/4 h-[25rem] w-[35rem] rounded-full bg-purple-500/10 blur-3xl" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-bold text-gray-900">Co mówią nasi tutorzy?</h2>
                    <p className="text-gray-600 mt-2 text-lg">Dołącz do grona zadowolonych korepetytorów, którzy odkryli swój flow</p>
                </div>

                <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-indigo-50/30 to-transparent z-10 pointer-events-none" />

                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-hidden py-4"
                        style={{ scrollBehavior: 'auto' }}
                    >
                        {doubledTestimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-96 rounded-2xl shadow-lg p-8 bg-white relative overflow-hidden"
                            >
                                <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-2xl" />

                                <div className="relative z-10">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                        ))}
                                    </div>

                                    <p className="text-gray-700 text-lg mb-6 italic leading-relaxed">
                                        "{testimonial.quote}"
                                    </p>

                                    <div className="flex items-center gap-4">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 p-1"
                                        />
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                            <p className="text-gray-600 text-sm">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}