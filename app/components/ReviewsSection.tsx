import { Link } from 'react-router';
import { Star, Quote, ArrowRight, Calendar } from 'lucide-react';

interface Review {
    id: string;
    date: string;
    displayName: string;
    displayNameType: string;
    ratings: {
        mentorComfort: number;
        expectationsMatch: number;
    };
    atmosphere: {
        generalImpression: string;
        likedStyle: string;
        threeWords: string;
    };
    mentor: {
        memorable: string;
    };
}

interface ReviewsSectionProps {
    reviews: Review[];
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
    // Рандомізуємо та беремо 3 відгуки
    const shuffled = [...reviews].sort(() => Math.random() - 0.5);
    const displayReviews = shuffled.slice(0, 3);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('uk-UA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const truncateText = (text: string, maxLength: number = 180) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength).trim() + '...';
    };

    if (reviews.length === 0) {
        return null;
    }

    return (
        <section className="py-16">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    Відгуки про навчання
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                    Реальні враження студентів про навчання
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {displayReviews.map((review) => (
                    <div
                        key={review.id}
                        className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col h-full hover:border-lime-400 dark:hover:border-lime-500 transition-colors"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-lime-100 dark:bg-lime-900/30 flex items-center justify-center">
                                    <span className="text-lime-600 dark:text-lime-400 font-bold">
                                        {review.displayName.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                                        {review.displayName}
                                    </h3>
                                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                        <Calendar className="w-3 h-3" />
                                        {formatDate(review.date)}
                                    </div>
                                </div>
                            </div>
                            <Quote className="w-6 h-6 text-lime-400 dark:text-lime-500 opacity-50" />
                        </div>

                        {/* Три слова */}
                        <div className="mb-3">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">Атмосфера навчання:</p>
                            <div className="flex flex-wrap gap-1.5">
                                {review.atmosphere.threeWords.split(',').map((word, i) => (
                                    <span
                                        key={i}
                                        className="px-2 py-0.5 text-xs font-medium bg-lime-50 dark:bg-lime-900/20 text-lime-700 dark:text-lime-400 rounded-full"
                                    >
                                        {word.trim().toLowerCase()}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Рейтинги */}
                        <div className="flex gap-3 mb-3">
                            <div className="flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                <span className="text-xs text-gray-600 dark:text-gray-300">
                                    {review.ratings.mentorComfort}/10
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                <span className="text-xs text-gray-600 dark:text-gray-300">
                                    {review.ratings.expectationsMatch}/10
                                </span>
                            </div>
                        </div>

                        {/* Коротке враження */}
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-grow mb-3">
                            {truncateText(review.atmosphere.generalImpression)}
                        </p>

                        {/* Посилання */}
                        <Link
                            to={`/reviews/${review.id}`}
                            className="inline-flex items-center gap-1.5 text-lime-600 dark:text-lime-400 hover:text-lime-700 dark:hover:text-lime-300 font-medium text-sm transition-colors mt-auto"
                        >
                            Читати повністю
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                ))}
            </div>

            {/* Кнопка до всіх відгуків */}
            <div className="text-center">
                <Link
                    to="/reviews"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-lime-600 hover:bg-lime-700 dark:bg-lime-500 dark:hover:bg-lime-600 text-white dark:text-slate-900 font-medium rounded-lg transition-colors"
                >
                    Всі відгуки
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
    );
}
