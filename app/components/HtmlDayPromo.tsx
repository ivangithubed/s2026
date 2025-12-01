import { Calendar, Search, Heart, Play, Trophy } from 'lucide-react';

export const HtmlDayPromo = () => {
    return (
        <section className="py-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Застосунок для моїх студентів</h2>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-12 shadow-xl border border-slate-200 dark:border-slate-800">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                    {/* SVG Icon */}
                    <div className="shrink-0">
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="w-14 h-14 md:w-20 md:h-20 text-white"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m16 18 6-6-6-6" />
                                <path d="m8 6-6 6 6 6" />
                            </svg>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="grow text-center lg:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-lime-600 dark:text-lime-400 mb-4">
                            HTML Day
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 text-lg mb-6 max-w-2xl">
                            Безкоштовний застосунок для вивчення HTML-елементів. Щодня отримуйте новий елемент,
                            переглядайте його атрибути та роль у веб-доступності, а також переходьте на MDN
                            для детальної документації.
                        </p>
                        <p className="text-slate-600 dark:text-slate-300 text-lg mb-6 max-w-2xl">
                            Доступна вікторина для перевірки знань. Ідеально для початківців та тих, хто хоче освіжити свої знання з HTML!
                        </p>
                        {/* Features */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                <Calendar className="w-5 h-5 text-lime-600 dark:text-lime-400" />
                                <span className="text-sm">Елемент дня</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                <Search className="w-5 h-5 text-lime-600 dark:text-lime-400" />
                                <span className="text-sm">Пошук тегів</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                <Heart className="w-5 h-5 text-pink-500 dark:text-pink-400" />
                                <span className="text-sm">Обране</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                <Trophy className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                                <span className="text-sm">Вікторина</span>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <a
                            href="https://html-day-eight.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-lime-600 hover:bg-lime-700 dark:bg-lime-500 dark:hover:bg-lime-600 text-white dark:text-slate-900 font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg shadow-lime-600/30"
                        >
                            <Play className="w-5 h-5" />
                            Спробувати (безкоштовно)
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
