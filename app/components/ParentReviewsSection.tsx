import { Link } from 'react-router';
import { Quote, ArrowRight, Calendar, User, Baby } from 'lucide-react';

interface ParentReview {
    id: string;
    date: string;
    parentType: 'mom' | 'dad';
    childName: string;
    childAge: number;
    formatSatisfaction: string;
    formatComment: string;
    explanationQuality: string;
    favoritePart: string;
    progressNoticed: string;
    duration: string;
    additionalComments: string;
}

interface ParentReviewsSectionProps {
    reviews: ParentReview[];
}

export default function ParentReviewsSection({ reviews }: ParentReviewsSectionProps) {
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

    const getParentLabel = (type: 'mom' | 'dad') => {
        return type === 'mom' ? 'Мама' : 'Тато';
    };

    const getProgressLabel = (progress: string) => {
        const labels: Record<string, string> = {
            'yes_notable': '✅ Помітний прогрес',
            'yes_want_more': '📈 Є прогрес',
            'not_really': '🔄 В процесі',
            'no_opinion': '🤔 Ще рано казати'
        };
        return labels[progress] || progress;
    };

    const getDurationLabel = (duration: string) => {
        const labels: Record<string, string> = {
            'less_6_months': '< 6 міс',
            '6_to_12_months': '6-12 міс',
            '1_to_2_years': '1-2 роки',
            '2_to_3_years': '2-3 роки',
            'more_3_years': '3+ роки'
        };
        return labels[duration] || duration;
    };

    const truncateText = (text: string, maxLength: number = 120) => {
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
                    Відгуки батьків
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                    Що кажуть батьки учнів-підлітків про навчання
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
                                    <User className="w-5 h-5 text-lime-600 dark:text-lime-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                                        {getParentLabel(review.parentType)} {review.childName}
                                    </h3>
                                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                        <Calendar className="w-3 h-3" />
                                        {formatDate(review.date)}
                                    </div>
                                </div>
                            </div>
                            <Quote className="w-6 h-6 text-lime-400 dark:text-lime-500 opacity-50" />
                        </div>

                        {/* Інформація про дитину */}
                        <div className="flex flex-wrap gap-2 mb-3">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full">
                                <Baby className="w-3 h-3" />
                                {review.childAge} років
                            </span>
                            <span className="px-2 py-0.5 text-xs font-medium bg-lime-50 dark:bg-lime-900/20 text-lime-700 dark:text-lime-400 rounded-full">
                                {getDurationLabel(review.duration)}
                            </span>
                        </div>

                        {/* Прогрес */}
                        <div className="mb-3">
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                {getProgressLabel(review.progressNoticed)}
                            </span>
                        </div>

                        {/* Що найбільше подобається */}
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed grow mb-3">
                            {truncateText(review.favoritePart)}
                        </p>

                        {/* Посилання */}
                        <Link
                            to={`/parent-reviews/${review.id}`}
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
                    to="/parent-reviews"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-lime-600 hover:bg-lime-700 dark:bg-lime-500 dark:hover:bg-lime-600 text-white dark:text-slate-900 font-medium rounded-lg transition-colors"
                >
                    Всі відгуки батьків
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
    );
}
