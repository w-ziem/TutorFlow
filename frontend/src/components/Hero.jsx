import React from 'react';
import placeholder from "../assets/placeholder.png";

const Hero = () => {
    return (
        <section className="overflow-hidden relative isolate  bg-background text-white md:overflow-visible">
            {/* Dekoracyjne tła */}
            <div aria-hidden="true" className="pointer-events-none absolute -top-15 right-1/3 h-[36rem] w-[36rem] translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-0 left-1/4 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-3xl" />

            <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
                <div className="mx-auto max-w-[1200] text-center flex flex-col items-center">
                    <h1 className="font-main text-heading text-6xl md:text-8xl max-w-3xl py-2 font-extrabold">
                        Twoje lekcje. Twój flow.
                    </h1>

                    <p className="mt-6 text-pretty text-2xl leading-8 text-text">
                        TutorFlow to asystent dla nowoczesnych tutorów. Wszystko, czego potrzebujesz, by prowadzić korepetycje
                        w pełnym spokoju – od pierwszej lekcji po ostatnią płatność.
                    </p>

                    <div className="mt-10 flex items-center justify-center gap-4">
                        <a
                            href="#cta"
                            className="rounded-xl bg-secondary px-6 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:translate-y-[-1px] hover:bg-indigo-500 hover:shadow-indigo-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                            aria-label="Przejdź do sekcji rozpoczęcia"
                        >
                            Zacznij swój flow
                        </a>
                        <a
                            href="#features"
                            className="rounded-xl border-1 backdrop-blur-2xl px-6 py-3 text-base font-semibold text-text ring-1 ring-white/15 transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                            aria-label="Zobacz funkcje TutorFlow"
                        >
                            Zobacz więcej
                        </a>
                    </div>
                </div>

                    <img src={placeholder} className="mt-3" alt=""/>
            </div>
        </section>
    );
};

export default Hero;