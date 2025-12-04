import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Star, Quote, ArrowRight, Calendar, User, Baby, Clock } from 'lucide-react';
import type { Route } from './+types/reviews';

interface Review {
    id: string;
    date: string;
    displayName: string;
    displayNameType: string;
    marketingPermission: boolean;
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
        bestInteraction: string;
        feltSupport: string;
    };
    experience: {
        pleasantSurprise: string;
        improvements: string;
        wowMoment: string;
        stillUsing: string;
        motivation: string;
    };
    support: {
        feedbackSufficient: string;
        chatConvenience: string;
    };
    recommendations: {
        suggestions: string;
        recommendWhy: string;
    };
}

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

interface ReviewsData {
    reviews: Review[];
}

interface ParentReviewsData {
    reviews: ParentReview[];
}

export async function loader({ request }: Route.LoaderArgs) {
    const reviewsUrl = new URL('/data/reviews.json', request.url);
    const parentReviewsUrl = new URL('/data/parent-reviews.json', request.url);

    const [reviewsRes, parentReviewsRes] = await Promise.all([
        fetch(reviewsUrl.href),
        fetch(parentReviewsUrl.href),
    ]);

    const reviewsData: ReviewsData = await reviewsRes.json();
    const parentReviewsData: ParentReviewsData = await parentReviewsRes.json();

    return { reviews: reviewsData.reviews, parentReviews: parentReviewsData.reviews };
}

function ReviewCard({ review }: { review: Review }) {
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('uk-UA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Обрізаємо текст для картки
    const truncateText = (text: string, maxLength: number = 200) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength).trim() + '...';
    };

    return (
        <div
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col h-full hover:border-lime-400 dark:hover:border-lime-500 transition-colors"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-lime-100 dark:bg-lime-900/30 flex items-center justify-center">
                        <span className="text-lime-600 dark:text-lime-400 font-bold text-lg">
                            {review.displayName.charAt(0)}
                        </span>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                            {review.displayName}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                            <Calendar className="w-3 h-3" />
                            {formatDate(review.date)}
                        </div>
                    </div>
                </div>
                <Quote className="w-8 h-8 text-lime-400 dark:text-lime-500 opacity-50" />
            </div>

            {/* Три слова */}
            <div className="mb-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">Атмосфера навчання:</p>
                <div className="flex flex-wrap gap-2">
                    {review.atmosphere.threeWords.split(',').map((word, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 text-xs font-medium bg-lime-50 dark:bg-lime-900/20 text-lime-700 dark:text-lime-400 rounded-full"
                        >
                            {word.trim().toLowerCase()}
                        </span>
                    ))}
                </div>
            </div>

            {/* Рейтинги */}
            <div className="flex gap-4 mb-4">
                <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                        Комфорт: <strong>{review.ratings.mentorComfort}/10</strong>
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                        Очікування: <strong>{review.ratings.expectationsMatch}/10</strong>
                    </span>
                </div>
            </div>

            {/* Коротке враження */}
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed grow mb-4">
                {truncateText(review.atmosphere.generalImpression)}
            </p>

            {/* Що запам'яталось */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 mb-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    💡 Що запам'яталось найбільше:
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-200">
                    {review.mentor.memorable}
                </p>
            </div>

            {/* Посилання на повний відгук */}
            <Link
                to={`/reviews/${review.id}`}
                className="inline-flex items-center gap-2 text-lime-600 dark:text-lime-400 hover:text-lime-700 dark:hover:text-lime-300 font-medium text-sm transition-colors mt-auto"
            >
                Читати повністю
                <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
    );
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

    const getProgressLabel = (progress: string) => {
        const labels: Record<string, { text: string; emoji: string }> = {
            'yes_notable': { text: 'Помітний прогрес', emoji: '✅' },
            'yes_want_more': { text: 'Є прогрес', emoji: '📈' },
            'not_really': { text: 'В процесі', emoji: '🔄' },
            'no_opinion': { text: 'Ще рано казати', emoji: '🤔' }
        };
        return labels[progress] || { text: progress, emoji: '' };
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

    const truncateText = (text: string, maxLength: number = 150) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength).trim() + '...';
    };

    const progressLabel = getProgressLabel(review.progressNoticed);

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col h-full hover:border-lime-400 dark:hover:border-lime-500 transition-colors">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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
                <Quote className="w-8 h-8 text-blue-400 dark:text-blue-500 opacity-50" />
            </div>

            {/* Теги */}
            <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full">
                    <Baby className="w-3 h-3" />
                    {review.childAge} років
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full">
                    <Clock className="w-3 h-3" />
                    {getDurationLabel(review.duration)}
                </span>
                <span className="px-3 py-1 text-xs font-medium bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-full">
                    👨‍👩‍👧 Батьки
                </span>
            </div>

            {/* Прогрес */}
            <div className="flex items-center gap-2 mb-4 p-2 bg-lime-50 dark:bg-lime-900/10 rounded-lg">
                <span className="text-lg">{progressLabel.emoji}</span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                    {progressLabel.text}
                </span>
            </div>

            {/* Що подобається */}
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed grow mb-4">
                {truncateText(review.favoritePart)}
            </p>

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

export default function ReviewsPage({ loaderData }: { loaderData: Awaited<ReturnType<typeof loader>> }) {
    const { reviews, parentReviews } = loaderData;

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
                    Відгуки про навчання
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Реальні враження студентів та батьків учнів. Кожен відгук — це унікальна історія розвитку.
                </p>
            </motion.div>

            {/* Відгуки дорослих студентів */}
            {reviews.length > 0 && (
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <span className="text-lime-500">👨‍💻</span> Відгуки студентів
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reviews.map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                </div>
            )}

            {/* Відгуки батьків */}
            {parentReviews.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <span className="text-blue-500">👨‍👩‍👧</span> Відгуки батьків підлітків
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {parentReviews.map((review) => (
                            <ParentReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                </div>
            )}

            {reviews.length === 0 && parentReviews.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                        Відгуки з'являться тут найближчим часом 🌱
                    </p>
                </div>
            )}
        </div>
    );
}
