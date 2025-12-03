import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Star, Quote, ArrowLeft, ArrowRight, Calendar, ChevronLeft, MessageCircle, Lightbulb, Heart, Award, ThumbsUp } from 'lucide-react';
import type { Route } from './+types/reviews.$reviewId';

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

interface ReviewsData {
    reviews: Review[];
}

export async function loader({ params, request }: Route.LoaderArgs) {
    const reviewsUrl = new URL('/data/reviews.json', request.url);
    const reviewsRes = await fetch(reviewsUrl.href);
    const reviewsData: ReviewsData = await reviewsRes.json();

    const currentIndex = reviewsData.reviews.findIndex(r => r.id === params.reviewId);
    const review = reviewsData.reviews[currentIndex];

    if (!review) {
        throw new Response('Not Found', { status: 404 });
    }

    const prevReview = currentIndex > 0 ? reviewsData.reviews[currentIndex - 1] : null;
    const nextReview = currentIndex < reviewsData.reviews.length - 1 ? reviewsData.reviews[currentIndex + 1] : null;

    return { review, prevReview, nextReview, currentIndex, total: reviewsData.reviews.length };
}

function RatingBar({ value, max = 10, label }: { value: number; max?: number; label: string }) {
    const percentage = (value / max) * 100;

    return (
        <div className="mb-3">
            <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
                <span className="text-sm font-bold text-lime-600 dark:text-lime-400">{value}/{max}</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="bg-lime-500 h-2 rounded-full"
                />
            </div>
        </div>
    );
}

function Section({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 mb-6"
        >
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-lime-100 dark:bg-lime-900/30 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-lime-600 dark:text-lime-400" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
            </div>
            {children}
        </motion.div>
    );
}

function QuoteBlock({ text }: { text: string }) {
    return (
        <div className="relative pl-4 border-l-4 border-lime-400 dark:border-lime-500 py-2">
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-line">
                {text}
            </p>
        </div>
    );
}

function InfoItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="mb-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
            <p className="text-gray-700 dark:text-gray-200">{value}</p>
        </div>
    );
}

export default function ReviewDetailPage({ loaderData }: { loaderData: Awaited<ReturnType<typeof loader>> }) {
    const { review, prevReview, nextReview, currentIndex, total } = loaderData;

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('uk-UA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Back Link */}
            <Link
                to="/reviews"
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-lime-600 dark:hover:text-lime-400 mb-6 transition-colors"
            >
                <ChevronLeft className="w-4 h-4" />
                Всі відгуки
            </Link>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 mb-6"
            >
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-lime-100 dark:bg-lime-900/30 flex items-center justify-center">
                            <span className="text-lime-600 dark:text-lime-400 font-bold text-2xl">
                                {review.displayName.charAt(0)}
                            </span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {review.displayName}
                            </h1>
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                <Calendar className="w-4 h-4" />
                                {formatDate(review.date)}
                            </div>
                        </div>
                    </div>
                    <Quote className="w-12 h-12 text-lime-400 dark:text-lime-500 opacity-30" />
                </div>

                {/* Три слова */}
                <div className="mb-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Атмосфера навчання:</p>
                    <div className="flex flex-wrap gap-2">
                        {review.atmosphere.threeWords.split(',').map((word, i) => (
                            <span
                                key={i}
                                className="px-4 py-2 text-sm font-medium bg-lime-50 dark:bg-lime-900/20 text-lime-700 dark:text-lime-400 rounded-full"
                            >
                                {word.trim().toLowerCase()}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Рейтинги */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <RatingBar value={review.ratings.mentorComfort} label="Комфорт роботи з ментором" />
                    <RatingBar value={review.ratings.expectationsMatch} label="Відповідність очікуванням" />
                </div>
            </motion.div>

            {/* Загальне враження */}
            <Section icon={MessageCircle} title="Загальне враження">
                <QuoteBlock text={review.atmosphere.generalImpression} />
                <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <InfoItem label="Що сподобалось у стилі занять" value={review.atmosphere.likedStyle} />
                </div>
            </Section>

            {/* Взаємодія з ментором */}
            <Section icon={Heart} title="Взаємодія з ментором">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                        <InfoItem label="💡 Що запам'яталось найбільше" value={review.mentor.memorable} />
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                        <InfoItem label="🤝 Що працювало найкраще" value={review.mentor.bestInteraction} />
                    </div>
                </div>
                <div className="mt-4 p-4 bg-lime-50 dark:bg-lime-900/20 rounded-lg">
                    <InfoItem label="Чи відчувалась підтримка" value={review.mentor.feltSupport} />
                </div>
            </Section>

            {/* Досвід навчання */}
            <Section icon={Lightbulb} title="Досвід навчання">
                <div className="space-y-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                        <InfoItem label="✨ WOW-момент" value={review.experience.wowMoment} />
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                        <InfoItem label="🎁 Що приємно здивувало" value={review.experience.pleasantSurprise} />
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                        <InfoItem label="💪 Що допомогло зберегти мотивацію" value={review.experience.motivation} />
                    </div>
                    <div className="p-4 bg-lime-50 dark:bg-lime-900/20 rounded-lg">
                        <InfoItem label="📚 Що продовжує використовувати" value={review.experience.stillUsing} />
                    </div>
                </div>
            </Section>

            {/* Підтримка */}
            <Section icon={Award} title="Підтримка та зворотний зв'язок">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                        <InfoItem label="Достатність зворотного зв'язку" value={review.support.feedbackSufficient} />
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                        <InfoItem label="Зручність чату/спільноти" value={review.support.chatConvenience} />
                    </div>
                </div>
            </Section>

            {/* Рекомендації */}
            <Section icon={ThumbsUp} title="Рекомендації">
                <div className="p-4 bg-lime-50 dark:bg-lime-900/20 rounded-lg mb-4">
                    <InfoItem label="Чи рекомендує курс іншим" value={review.recommendations.recommendWhy} />
                </div>
                {review.experience.improvements && (
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg mb-4">
                        <InfoItem label="💬 Що можна покращити" value={review.experience.improvements} />
                    </div>
                )}
                {review.recommendations.suggestions && (
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                        <InfoItem label="💡 Пропозиції" value={review.recommendations.suggestions} />
                    </div>
                )}
            </Section>

            {/* Навігація */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
                {prevReview ? (
                    <Link
                        to={`/reviews/${prevReview.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-lime-100 dark:hover:bg-lime-900/30 text-gray-700 dark:text-gray-300 hover:text-lime-700 dark:hover:text-lime-400 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">{prevReview.displayName}</span>
                        <span className="sm:hidden">Попередній</span>
                    </Link>
                ) : (
                    <div />
                )}

                <span className="text-sm text-gray-500 dark:text-gray-400">
                    {currentIndex + 1} з {total}
                </span>

                {nextReview ? (
                    <Link
                        to={`/reviews/${nextReview.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-lime-100 dark:hover:bg-lime-900/30 text-gray-700 dark:text-gray-300 hover:text-lime-700 dark:hover:text-lime-400 rounded-lg transition-colors"
                    >
                        <span className="hidden sm:inline">{nextReview.displayName}</span>
                        <span className="sm:hidden">Наступний</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                ) : (
                    <div />
                )}
            </div>
        </div>
    );
}
