import { Link } from "react-router";
import { Braces, Search, BookOpen, Terminal, Play } from 'lucide-react';

export const JsOperatorsPromo = () => {
    return (
        <section className="mb-8">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-12 shadow-xl border border-slate-200 dark:border-slate-800">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                    {/* Icon Container */}
                    <div className="shrink-0">
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-[#F7DF1E] rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
                            <Braces className="w-14 h-14 md:w-20 md:h-20 text-black" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="grow text-center lg:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-lime-600 dark:text-lime-400 mb-4">
                            JS Operators Handbook
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 text-lg mb-6 max-w-2xl">
                            Практичний довідник операторів JavaScript. Від базової арифметики до складних побітових операцій та сучасних операторів (як-от нульове злиття).
                        </p>
                        <p className="text-slate-600 dark:text-slate-300 text-lg mb-6 max-w-2xl">
                            Кожен оператор містить детальний опис українською, приклади коду, синтаксис та прямі посилання на офіційну документацію MDN.
                        </p>

                        {/* Features */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                <BookOpen className="w-5 h-5 text-lime-600 dark:text-lime-400" />
                                <span className="text-sm">47 операторів</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                <Search className="w-5 h-5 text-lime-600 dark:text-lime-400" />
                                <span className="text-sm">Швидкий пошук</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                <Terminal className="w-5 h-5 text-lime-600 dark:text-lime-400" />
                                <span className="text-sm">Приклади коду</span>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <Link
                            to="/tools/operators"
                            className="inline-flex items-center gap-2 bg-lime-600 hover:bg-lime-700 dark:bg-lime-500 dark:hover:bg-lime-600 text-white dark:text-slate-900 font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg shadow-lime-600/30"
                        >
                            <Play className="w-5 h-5" />
                            Відкрити довідник
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};
