import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Quote, ArrowRight, Calendar, User, Baby, CheckCircle, BookOpen, Clock } from 'lucide-react';
import type { Route } from './+types/parent-reviews';

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

interface ParentReviewsData {
    reviews: ParentReview[];
}

export async function loader({ request }: Route.LoaderArgs) {
    const reviewsUrl = new URL('/data/parent-reviews.json', request.url);
    const reviewsRes = await fetch(reviewsUrl.href);
    const reviewsData: ParentReviewsData = await reviewsRes.json();
    return { reviews: reviewsData.reviews };
}

function ParentReviewCard({ review }: { review: ParentReview }) {
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

    const getFormatLabel = (format: string) => {
        const labels: Record<string, { text: string; color: string }> = {
            'yes': { text: 'Так', color: 'text-green-600 dark:text-green-400' },
            'mostly_yes': { text: 'Скоріше так', color: 'text-lime-600 dark:text-lime-400' },
            'neutral': { text: 'Нейтрально', color: 'text-gray-600 dark:text-gray-400' },
            'mostly_no': { text: 'Скоріше ні', color: 'text-orange-600 dark:text-orange-400' },
            'no': { text: 'Ні', color: 'text-red-600 dark:text-red-400' }
        };
        return labels[format] || { text: format, color: '' };
    };

    const getExplanationLabel = (quality: string) => {
        const labels: Record<string, string> = {
            'very_clear': 'Дуже зрозуміло',
            'clear': 'Зрозуміло',
            'sometimes_hard': 'Місцями складно',
            'often_hard': 'Часто складно'
        };
        return labels[quality] || quality;
    };

    const getProgressLabel = (progress: string) => {
        const labels: Record<string, { text: string; emoji: string }> = {
            'yes_notable': { text: 'Так, помітно', emoji: '✅' },
            'yes_want_more': { text: 'Так, але хотілося б більше', emoji: '📈' },
            'not_really': { text: 'Поки що не дуже', emoji: '🔄' },
            'no_opinion': { text: 'Поки не сформувалася думка', emoji: '🤔' }
        };
        return labels[progress] || { text: progress, emoji: '' };
    };

    const getDurationLabel = (duration: string) => {
        const labels: Record<string, string> = {
            'less_6_months': 'Менше 6 місяців',
            '6_to_12_months': 'Від 6 до 12 місяців',
            '1_to_2_years': 'Від 1 до 2 років',
            '2_to_3_years': 'Від 2 до 3 років',
            'more_3_years': 'Більше 3 років'
        };
        return labels[duration] || duration;
    };

    const truncateText = (text: string, maxLength: number = 150) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength).trim() + '...';
    };

    const formatLabel = getFormatLabel(review.formatSatisfaction);
    const progressLabel = getProgressLabel(review.progressNoticed);

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col h-full hover:border-lime-400 dark:hover:border-lime-500 transition-colors">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-lime-100 dark:bg-lime-900/30 flex items-center justify-center">
                        <User className="w-6 h-6 text-lime-600 dark:text-lime-400" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                            {getParentLabel(review.parentType)} {review.childName}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                            <Calendar className="w-3 h-3" />
                            {formatDate(review.date)}
                        </div>
                    </div>
                </div>
                <Quote className="w-8 h-8 text-lime-400 dark:text-lime-500 opacity-50" />
            </div>

            {/* Інформація про дитину та тривалість */}
            <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full">
                    <Baby className="w-3 h-3" />
                    {review.childAge} років
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full">
                    <Clock className="w-3 h-3" />
                    {getDurationLabel(review.duration)}
                </span>
            </div>

            {/* Оцінки */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Формат занять:</p>
                    <p className={`text-sm font-medium ${formatLabel.color}`}>
                        {formatLabel.text}
                    </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Пояснення:</p>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {getExplanationLabel(review.explanationQuality)}
                    </p>
                </div>
            </div>

            {/* Прогрес */}
            <div className="flex items-center gap-2 mb-4 p-2 bg-lime-50 dark:bg-lime-900/10 rounded-lg">
                <span className="text-lg">{progressLabel.emoji}</span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                    Прогрес: <strong>{progressLabel.text}</strong>
                </span>
            </div>

            {/* Що подобається */}
            <div className="mb-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    ❤️ Що найбільше подобається:
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {truncateText(review.favoritePart)}
                </p>
            </div>

            {/* Посилання на повний відгук */}
            <Link
                to={`/parent-reviews/${review.id}`}
                className="inline-flex items-center gap-2 text-lime-600 dark:text-lime-400 hover:text-lime-700 dark:hover:text-lime-300 font-medium text-sm transition-colors mt-auto"
            >
                Читати повністю
                <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
    );
}

export default function ParentReviewsPage({ loaderData }: { loaderData: Awaited<ReturnType<typeof loader>> }) {
    const { reviews } = loaderData;

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Відгуки батьків
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Що кажуть батьки учнів-підлітків про навчання та прогрес своїх дітей
                </p>
            </motion.div>

            {/* Reviews Grid */}
            {reviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review) => (
                        <ParentReviewCard key={review.id} review={review} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                        Відгуки батьків з'являться тут найближчим часом 🌱
                    </p>
                </div>
            )}
        </div>
    );
}
