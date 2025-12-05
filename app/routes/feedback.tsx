import { useState, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface FormErrors {
    general_impression?: string;
    liked_style?: string;
    three_words?: string;
    mentor_memorable?: string;
    mentor_best?: string;
    felt_support?: string;
    pleasant_surprise?: string;
    improvements?: string;
    wow_moment?: string;
    still_using?: string;
    motivation?: string;
    feedback_sufficient?: string;
    chat_convenience?: string;
    suggestions?: string;
    recommend_why?: string;
    marketing_permission?: string;
    display_name_type?: string;
    display_name?: string;
}

export default function FeedbackPage() {
    const [displayNameType, setDisplayNameType] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const inputClasses = "bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-400 dark:focus:border-lime-400";
    const inputErrorClasses = "bg-slate-50 border-2 border-red-500 text-slate-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-slate-800 dark:border-red-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-400 dark:focus:border-red-400";
    const labelClasses = "block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300";
    const sectionTitleClasses = "text-xl font-semibold text-lime-600 dark:text-lime-400 mb-4 mt-8 flex items-center gap-2";
    const radioClasses = "w-4 h-4 text-lime-600 bg-slate-100 border-slate-300 focus:ring-lime-500 dark:focus:ring-lime-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600";
    const errorTextClasses = "text-red-500 text-xs mt-1 flex items-center gap-1";

    const validateForm = (formData: FormData): FormErrors => {
        const newErrors: FormErrors = {};

        // Обов'язкові текстові поля
        const requiredTextFields = [
            { name: 'general_impression', label: 'загальне враження', minLength: 20 },
            { name: 'liked_style', label: 'стиль занять', minLength: 10 },
            { name: 'three_words', label: 'три слова', minLength: 5 },
            { name: 'mentor_memorable', label: 'що запам\'яталось', minLength: 10 },
            { name: 'mentor_best', label: 'найкраща взаємодія', minLength: 10 },
            { name: 'felt_support', label: 'підтримка', minLength: 2 },
            { name: 'pleasant_surprise', label: 'приємне здивування', minLength: 10 },
            { name: 'wow_moment', label: 'вау-момент', minLength: 10 },
            { name: 'still_using', label: 'що використовуєш', minLength: 10 },
            { name: 'motivation', label: 'мотивація', minLength: 10 },
            { name: 'feedback_sufficient', label: 'зворотний зв\'язок', minLength: 2 },
            { name: 'chat_convenience', label: 'чат', minLength: 10 },
            { name: 'recommend_why', label: 'рекомендація', minLength: 10 },
        ];

        for (const field of requiredTextFields) {
            const value = (formData.get(field.name) as string)?.trim() || '';
            if (!value) {
                newErrors[field.name as keyof FormErrors] = `Поле "${field.label}" обов'язкове`;
            } else if (value.length < field.minLength) {
                newErrors[field.name as keyof FormErrors] = `Мінімум ${field.minLength} символів`;
            }
        }

        // Валідація трьох слів
        const threeWords = (formData.get('three_words') as string)?.trim() || '';
        if (threeWords && !threeWords.includes(',')) {
            newErrors.three_words = 'Введіть три слова через кому';
        }

        // Валідація radio buttons
        const marketingPermission = formData.get('marketing_permission');
        if (!marketingPermission) {
            newErrors.marketing_permission = 'Оберіть один з варіантів';
        }

        const displayNameTypeValue = formData.get('display_name_type');
        if (!displayNameTypeValue) {
            newErrors.display_name_type = 'Оберіть як вас підписати';
        }

        // Валідація display_name якщо не анонімно
        if (displayNameTypeValue && displayNameTypeValue !== 'anonymous') {
            const displayName = (formData.get('display_name') as string)?.trim() || '';
            if (!displayName) {
                newErrors.display_name = 'Вкажіть як вас підписати';
            } else if (displayName.length < 2) {
                newErrors.display_name = 'Мінімум 2 символи';
            }
        }

        return newErrors;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        setSubmitError('');
        setSubmitSuccess(false);

        const form = e.currentTarget;
        const formData = new FormData(form);

        // Валідація
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            // Скрол до першої помилки
            const firstErrorField = Object.keys(validationErrors)[0];
            const element = document.getElementById(firstErrorField);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                element.focus();
            }
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('https://formspree.io/f/mwpgbjow', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setSubmitSuccess(true);
                form.reset();
                setDisplayNameType('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                throw new Error('Помилка відправки');
            }
        } catch {
            setSubmitError('Не вдалося надіслати форму. Спробуйте ще раз.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const ErrorMessage = ({ error }: { error?: string }) => {
        if (!error) return null;
        return (
            <p className={errorTextClasses}>
                <AlertCircle className="w-3 h-3" />
                {error}
            </p>
        );
    };

    if (submitSuccess) {
        return (
            <div className="max-w-3xl mx-auto">
                <div className="bg-white dark:bg-slate-900 p-12 rounded-lg border border-slate-200 dark:border-slate-800 text-center">
                    <CheckCircle2 className="w-16 h-16 text-lime-500 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Дякуємо за відгук! 🎉
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                        Ваша думка дуже важлива для мене.
                    </p>
                    <a
                        href="/"
                        className="inline-block bg-lime-600 hover:bg-lime-700 dark:bg-lime-500 dark:hover:bg-lime-600 text-white dark:text-slate-900 font-bold py-3 px-6 rounded-lg transition"
                    >
                        На головну
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                🌿 Опитування для випускників
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-2">
                Дякую, що знайшов(-ла) час поділитися враженнями!
            </p>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8">
                Поля позначені <span className="text-red-500">*</span> обов'язкові для заповнення
            </p>

            {submitError && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-4 rounded-lg mb-6 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {submitError}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-slate-900 p-8 rounded-lg border border-slate-200 dark:border-slate-800"
                noValidate
            >
                {/* 1. Загальна атмосфера */}
                <h2 className={sectionTitleClasses}>
                    <span>1.</span> Загальна атмосфера
                </h2>

                <div className="mb-6">
                    <label htmlFor="general_impression" className={labelClasses}>
                        Яке загальне враження залишилося після курсу? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="general_impression"
                        name="general_impression"
                        rows={3}
                        className={errors.general_impression ? inputErrorClasses : inputClasses}
                        placeholder="Опишіть ваші враження... (мінімум 20 символів)"
                        required
                        minLength={20}
                    />
                    <ErrorMessage error={errors.general_impression} />
                </div>

                <div className="mb-6">
                    <label htmlFor="liked_style" className={labelClasses}>
                        Що найбільше сподобалось у стилі проведення занять? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="liked_style"
                        name="liked_style"
                        rows={3}
                        className={errors.liked_style ? inputErrorClasses : inputClasses}
                        placeholder="Що вам сподобалось..."
                        required
                        minLength={10}
                    />
                    <ErrorMessage error={errors.liked_style} />
                </div>

                <div className="mb-6">
                    <label htmlFor="three_words" className={labelClasses}>
                        Як би ти описав(-ла) атмосферу на курсі трьома словами? <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="three_words"
                        name="three_words"
                        className={errors.three_words ? inputErrorClasses : inputClasses}
                        placeholder="Наприклад: дружня, продуктивна, натхненна"
                        required
                    />
                    <ErrorMessage error={errors.three_words} />
                </div>

                {/* 2. Взаємодія з ментором */}
                <h2 className={sectionTitleClasses}>
                    <span>2.</span> Взаємодія з ментором
                </h2>

                <div className="mb-6">
                    <label htmlFor="mentor_comfort" className={labelClasses}>
                        Наскільки комфортно тобі було звертатися до ментора з питаннями? (1–10)
                    </label>
                    <input
                        type="range"
                        id="mentor_comfort"
                        name="mentor_comfort"
                        min="1"
                        max="10"
                        defaultValue="5"
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-lime-500"
                    />
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                        <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span>
                    </div>
                </div>

                <div className="mb-6">
                    <label htmlFor="mentor_memorable" className={labelClasses}>
                        Що в підході ментора тобі запам'яталося найбільше? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="mentor_memorable"
                        name="mentor_memorable"
                        rows={3}
                        className={errors.mentor_memorable ? inputErrorClasses : inputClasses}
                        placeholder="Ваша відповідь..."
                        required
                        minLength={10}
                    />
                    <ErrorMessage error={errors.mentor_memorable} />
                </div>

                <div className="mb-6">
                    <label htmlFor="mentor_best" className={labelClasses}>
                        Що у взаємодії з ментором працювало найкраще? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="mentor_best"
                        name="mentor_best"
                        rows={3}
                        className={errors.mentor_best ? inputErrorClasses : inputClasses}
                        placeholder="Ваша відповідь..."
                        required
                        minLength={10}
                    />
                    <ErrorMessage error={errors.mentor_best} />
                </div>

                <div className="mb-6">
                    <label htmlFor="felt_support" className={labelClasses}>
                        Чи відчував(-ла) ти підтримку протягом навчання? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="felt_support"
                        name="felt_support"
                        rows={2}
                        className={errors.felt_support ? inputErrorClasses : inputClasses}
                        placeholder="Ваша відповідь..."
                        required
                        minLength={2}
                    />
                    <ErrorMessage error={errors.felt_support} />
                </div>

                {/* 3. Очікування vs реальність */}
                <h2 className={sectionTitleClasses}>
                    <span>3.</span> Очікування vs реальність
                </h2>

                <div className="mb-6">
                    <label htmlFor="expectations_match" className={labelClasses}>
                        Наскільки курс відповідав твоїм очікуванням? (1–10)
                    </label>
                    <input
                        type="range"
                        id="expectations_match"
                        name="expectations_match"
                        min="1"
                        max="10"
                        defaultValue="5"
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-lime-500"
                    />
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                        <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span>
                    </div>
                </div>

                <div className="mb-6">
                    <label htmlFor="pleasant_surprise" className={labelClasses}>
                        Що приємно здивувало під час навчання? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="pleasant_surprise"
                        name="pleasant_surprise"
                        rows={3}
                        className={errors.pleasant_surprise ? inputErrorClasses : inputClasses}
                        placeholder="Ваша відповідь..."
                        required
                        minLength={10}
                    />
                    <ErrorMessage error={errors.pleasant_surprise} />
                </div>

                <div className="mb-6">
                    <label htmlFor="improvements" className={labelClasses}>
                        Чи було щось, що хотілось би бачити інакше (у форматі, темпі, подачі)?
                    </label>
                    <textarea
                        id="improvements"
                        name="improvements"
                        rows={3}
                        className={inputClasses}
                        placeholder="Ваша відповідь... (необов'язково)"
                    />
                </div>

                {/* 4. Особисті відчуття та досвід */}
                <h2 className={sectionTitleClasses}>
                    <span>4.</span> Особисті відчуття та досвід
                </h2>

                <div className="mb-6">
                    <label htmlFor="wow_moment" className={labelClasses}>
                        Який момент або урок став для тебе найбільш «вау»? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="wow_moment"
                        name="wow_moment"
                        rows={3}
                        className={errors.wow_moment ? inputErrorClasses : inputClasses}
                        placeholder="Ваша відповідь..."
                        required
                        minLength={10}
                    />
                    <ErrorMessage error={errors.wow_moment} />
                </div>

                <div className="mb-6">
                    <label htmlFor="still_using" className={labelClasses}>
                        Що з курсу ти продовжуєш використовувати або згадуєш найчастіше? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="still_using"
                        name="still_using"
                        rows={3}
                        className={errors.still_using ? inputErrorClasses : inputClasses}
                        placeholder="Ваша відповідь..."
                        required
                        minLength={10}
                    />
                    <ErrorMessage error={errors.still_using} />
                </div>

                <div className="mb-6">
                    <label htmlFor="motivation" className={labelClasses}>
                        Що допомогло тобі не втратити мотивацію під час навчання? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="motivation"
                        name="motivation"
                        rows={3}
                        className={errors.motivation ? inputErrorClasses : inputClasses}
                        placeholder="Ваша відповідь..."
                        required
                        minLength={10}
                    />
                    <ErrorMessage error={errors.motivation} />
                </div>

                {/* 5. Підтримка поза уроками */}
                <h2 className={sectionTitleClasses}>
                    <span>5.</span> Підтримка поза уроками
                </h2>

                <div className="mb-6">
                    <label htmlFor="feedback_sufficient" className={labelClasses}>
                        Чи було достатньо зворотного зв'язку під час виконання завдань? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="feedback_sufficient"
                        name="feedback_sufficient"
                        rows={2}
                        className={errors.feedback_sufficient ? inputErrorClasses : inputClasses}
                        placeholder="Ваша відповідь..."
                        required
                        minLength={2}
                    />
                    <ErrorMessage error={errors.feedback_sufficient} />
                </div>

                <div className="mb-6">
                    <label htmlFor="chat_convenience" className={labelClasses}>
                        Наскільки зручно було отримувати допомогу у чаті/ком'юніті? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="chat_convenience"
                        name="chat_convenience"
                        rows={2}
                        className={errors.chat_convenience ? inputErrorClasses : inputClasses}
                        placeholder="Ваша відповідь..."
                        required
                        minLength={10}
                    />
                    <ErrorMessage error={errors.chat_convenience} />
                </div>

                {/* 6. Рекомендації */}
                <h2 className={sectionTitleClasses}>
                    <span>6.</span> Рекомендації
                </h2>

                <div className="mb-6">
                    <label htmlFor="suggestions" className={labelClasses}>
                        Що можна додати, щоб зробити досвід навчання ще приємнішим?
                    </label>
                    <textarea
                        id="suggestions"
                        name="suggestions"
                        rows={3}
                        className={inputClasses}
                        placeholder="Ваші пропозиції... (необов'язково)"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="recommend_why" className={labelClasses}>
                        Чи порадиш ти цей курс іншим? Чому? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="recommend_why"
                        name="recommend_why"
                        rows={3}
                        className={errors.recommend_why ? inputErrorClasses : inputClasses}
                        placeholder="Ваша відповідь..."
                        required
                        minLength={10}
                    />
                    <ErrorMessage error={errors.recommend_why} />
                </div>

                {/* 7. Дозвіл */}
                <h2 className={sectionTitleClasses}>
                    <span>7.</span> Дозвіл
                </h2>

                <div className="mb-6">
                    <label className={labelClasses}>
                        Чи можна використати твій відгук у маркетингових матеріалах? <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-6 mt-2">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="marketing_permission"
                                value="yes"
                                className={radioClasses}
                                required
                            />
                            <span className="ml-2 text-sm text-slate-900 dark:text-gray-300">Так</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="marketing_permission"
                                value="no"
                                className={radioClasses}
                            />
                            <span className="ml-2 text-sm text-slate-900 dark:text-gray-300">Ні</span>
                        </label>
                    </div>
                    <ErrorMessage error={errors.marketing_permission} />
                </div>

                <div className="mb-6">
                    <label className={labelClasses}>
                        Як вказати тебе на сайті з коментарем? <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-col gap-3 mt-2">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="display_name_type"
                                value="first_name"
                                className={radioClasses}
                                onChange={(e) => setDisplayNameType(e.target.value)}
                                required
                            />
                            <span className="ml-2 text-sm text-slate-900 dark:text-gray-300">Тільки ім'я</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="display_name_type"
                                value="nickname"
                                className={radioClasses}
                                onChange={(e) => setDisplayNameType(e.target.value)}
                            />
                            <span className="ml-2 text-sm text-slate-900 dark:text-gray-300">Тільки нікнейм</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="display_name_type"
                                value="full_name"
                                className={radioClasses}
                                onChange={(e) => setDisplayNameType(e.target.value)}
                            />
                            <span className="ml-2 text-sm text-slate-900 dark:text-gray-300">Ім'я та прізвище</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="display_name_type"
                                value="anonymous"
                                className={radioClasses}
                                onChange={(e) => setDisplayNameType(e.target.value)}
                            />
                            <span className="ml-2 text-sm text-slate-900 dark:text-gray-300">Анонімно</span>
                        </label>
                    </div>
                    <ErrorMessage error={errors.display_name_type} />
                </div>

                {displayNameType && displayNameType !== 'anonymous' && (
                    <div className="mb-6">
                        <label htmlFor="display_name" className={labelClasses}>
                            {displayNameType === 'first_name' && "Вкажіть ваше ім'я:"}
                            {displayNameType === 'nickname' && "Вкажіть ваш нікнейм:"}
                            {displayNameType === 'full_name' && "Вкажіть ваше ім'я та прізвище:"}
                            <span className="text-red-500"> *</span>
                        </label>
                        <input
                            type="text"
                            id="display_name"
                            name="display_name"
                            className={errors.display_name ? inputErrorClasses : inputClasses}
                            placeholder={
                                displayNameType === 'first_name' ? "Наприклад: Олена" :
                                    displayNameType === 'nickname' ? "Наприклад: @developer_ua" :
                                        "Наприклад: Олена Петренко"
                            }
                            required
                            minLength={2}
                        />
                        <ErrorMessage error={errors.display_name} />
                    </div>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-lime-600 hover:bg-lime-700 dark:bg-lime-500 dark:hover:bg-lime-600 text-white dark:text-slate-900 font-bold py-3 px-6 rounded-lg transition mt-8 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Надсилаємо...
                        </>
                    ) : (
                        'Надіслати відгук'
                    )}
                </button>
            </form>
        </div>
    );
}
