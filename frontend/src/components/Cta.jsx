import React from 'react';
import {Link} from "react-router-dom";

const Cta = () => {
    return (
        <section id="cta" className="relative isolate overflow-hidden md:overflow-visible bg-background py-24">
            <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />

            <div className="mx-auto max-w-4xl px-6 text-center text-heading">
                <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
                    Zacznij swój flow
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-pretty text-text">
                    Wskocz do TutorFlow i prowadź korepetycje w pełnym spokoju – od pierwszej lekcji po ostatnią płatność.
                </p>

                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <a
                        href="#"
                        className="inline-flex items-center justify-center rounded-xl bg-secondary px-7 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:translate-y-[-1px] hover:bg-indigo-500 hover:shadow-indigo-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                    >
                        Załóż konto
                    </a>
                    <Link
                        to="/demo"
                        className="inline-flex border-1 backdrop-blur-2xl items-center justify-center rounded-xl px-7 py-3 text-base font-semibold text-heading ring-1 ring-white/15 transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                    >
                        Zobacz demo
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Cta;