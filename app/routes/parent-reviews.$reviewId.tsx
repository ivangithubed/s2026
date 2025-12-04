import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, User, Baby, Clock, BookOpen, CheckCircle, MessageCircle, Lightbulb } from 'lucide-react';
import type { Route } from './+types/parent-reviews.$reviewId';

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

export async function loader({ params, request }: Route.LoaderArgs) {
    const reviewsUrl = new URL('/data/parent-reviews.json', request.url);
    const reviewsRes = await fetch(reviewsUrl.href);
    const reviewsData: ParentReviewsData = await reviewsRes.json();

    const reviewIndex = reviewsData.reviews.findIndex(r => r.id === params.reviewId);
    const review = reviewsData.reviews[reviewIndex];

    if (!review) {
        throw new Response('Відгук не знайдено', { status: 404 });
    }

    const prevReview = reviewIndex > 0 ? reviewsData.reviews[reviewIndex - 1] : null;
    const nextReview = reviewIndex < reviewsData.reviews.length - 1 ? reviewsData.reviews[reviewIndex + 1] : null;

    return { review, prevReview, nextReview };
}

export default function ParentReviewDetailPage({ loaderData }: { loaderData: Awaited<ReturnType<typeof loader>> }) {
    const { review, prevReview, nextReview } = loaderData;

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
            'yes': { text: 'Так', color: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20' },
            'mostly_yes': { text: 'Скоріше так', color: 'text-lime-600 dark:text-lime-400 bg-lime-50 dark:bg-lime-900/20' },
            'neutral': { text: 'Нейтрально', color: 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800' },
            'mostly_no': { text: 'Скоріше ні', color: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20' },
            'no': { text: 'Ні', color: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20' }
        };
        return labels[format] || { text: format, color: '' };
    };

    const getExplanationLabel = (quality: string) => {
        const labels: Record<string, { text: string; color: string }> = {
            'very_clear': { text: 'Дуже зрозуміло', color: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20' },
            'clear': { text: 'Зрозуміло', color: 'text-lime-600 dark:text-lime-400 bg-lime-50 dark:bg-lime-900/20' },
            'sometimes_hard': { text: 'Місцями складно', color: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20' },
            'often_hard': { text: 'Часто складно', color: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20' }
        };
        return labels[quality] || { text: quality, color: '' };
    };

    const getProgressLabel = (progress: string) => {
        const labels: Record<string, { text: string; emoji: string; color: string }> = {
            'yes_notable': { text: 'Так, помітно', emoji: '✅', color: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20' },
            'yes_want_more': { text: 'Так, але хотілося б більше', emoji: '📈', color: 'text-lime-600 dark:text-lime-400 bg-lime-50 dark:bg-lime-900/20' },
            'not_really': { text: 'Поки що не дуже', emoji: '🔄', color: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20' },
            'no_opinion': { text: 'Поки не сформувалася думка', emoji: '🤔', color: 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800' }
        };
        return labels[progress] || { text: progress, emoji: '', color: '' };
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

    const formatLabel = getFormatLabel(review.formatSatisfaction);
    const explanationLabel = getExplanationLabel(review.explanationQuality);
    const progressLabel = getProgressLabel(review.progressNoticed);

    const sectionClasses = "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 mb-6";
    const sectionTitleClasses = "text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2";

    return (
        <div className="max-w-3xl mx-auto">
            {/* Навігація назад */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-6"
            >
                <Link
                    to="/parent-reviews"
                    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-lime-600 dark:hover:text-lime-400 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Всі відгуки батьків
                </Link>
            </motion.div>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={sectionClasses}
            >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-lime-100 dark:bg-lime-900/30 flex items-center justify-center shrink-0">
                        <User className="w-8 h-8 text-lime-600 dark:text-lime-400" />
                    </div>
                    <div className="grow">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {getParentLabel(review.parentType)} {review.childName}
                        </h1>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {formatDate(review.date)}
                            </span>
                            <span className="flex items-center gap-1">
                                <Baby className="w-4 h-4" />
                                Дитині {review.childAge} років
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {getDurationLabel(review.duration)}
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Оцінки */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={sectionClasses}
            >
                <h2 className={sectionTitleClasses}>
                    <CheckCircle className="w-5 h-5 text-lime-500" />
                    Оцінка навчання
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className={`rounded-lg p-4 ${formatLabel.color}`}>
                        <p className="text-xs opacity-70 mb-1">Формат занять</p>
                        <p className="font-semibold">{formatLabel.text}</p>
                    </div>
                    <div className={`rounded-lg p-4 ${explanationLabel.color}`}>
                        <p className="text-xs opacity-70 mb-1">Пояснення матеріалу</p>
                        <p className="font-semibold">{explanationLabel.text}</p>
                    </div>
                    <div className={`rounded-lg p-4 ${progressLabel.color}`}>
                        <p className="text-xs opacity-70 mb-1">Прогрес дитини</p>
                        <p className="font-semibold">{progressLabel.emoji} {progressLabel.text}</p>
                    </div>
                </div>

                {review.formatComment && (
                    <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Коментар до формату:</p>
                        <p className="text-gray-700 dark:text-gray-200">{review.formatComment}</p>
                    </div>
                )}
            </motion.div>

            {/* Що подобається */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={sectionClasses}
            >
                <h2 className={sectionTitleClasses}>
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    Що найбільше подобається на заняттях
                </h2>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                    {review.favoritePart}
                </p>
            </motion.div>

            {/* Додаткові коментарі */}
            {review.additionalComments && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className={sectionClasses}
                >
                    <h2 className={sectionTitleClasses}>
                        <MessageCircle className="w-5 h-5 text-blue-500" />
                        Додаткові коментарі
                    </h2>
                    <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                        {review.additionalComments}
                    </p>
                </motion.div>
            )}

            {/* Навігація між відгуками */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200 dark:border-slate-800"
            >
                {prevReview ? (
                    <Link
                        to={`/parent-reviews/${prevReview.id}`}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-lime-600 dark:hover:text-lime-400 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">
                            {getParentLabel(prevReview.parentType)} {prevReview.childName}
                        </span>
                        <span className="sm:hidden">Попередній</span>
                    </Link>
                ) : (
                    <div />
                )}

                {nextReview ? (
                    <Link
                        to={`/parent-reviews/${nextReview.id}`}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-lime-600 dark:hover:text-lime-400 transition-colors"
                    >
                        <span className="hidden sm:inline">
                            {getParentLabel(nextReview.parentType)} {nextReview.childName}
                        </span>
                        <span className="sm:hidden">Наступний</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                ) : (
                    <div />
                )}
            </motion.div>
        </div>
    );
}
