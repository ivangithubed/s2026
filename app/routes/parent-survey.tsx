import { useState, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface FormErrors {
    parent_type?: string;
    child_name?: string;
    child_age?: string;
    format_satisfaction?: string;
    explanation_quality?: string;
    favorite_part?: string;
    progress_noticed?: string;
    duration?: string;
}

export default function ParentSurveyPage() {
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const labelClasses = "block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300";
    const sectionTitleClasses = "text-lg font-semibold text-lime-600 dark:text-lime-400 mb-4 mt-6";
    const radioClasses = "w-4 h-4 text-lime-600 bg-slate-100 border-slate-300 focus:ring-lime-500 dark:focus:ring-lime-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600";
    const inputClasses = "bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-400 dark:focus:border-lime-400";
    const inputErrorClasses = "bg-slate-50 border-2 border-red-500 text-slate-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-slate-800 dark:border-red-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-400 dark:focus:border-red-400";
    const errorTextClasses = "text-red-500 text-xs mt-1 flex items-center gap-1";

    const validateForm = (formData: FormData): FormErrors => {
        const newErrors: FormErrors = {};

        if (!formData.get('parent_type')) {
            newErrors.parent_type = 'Оберіть один з варіантів';
        }

        const childName = (formData.get('child_name') as string)?.trim() || '';
        if (!childName) {
            newErrors.child_name = 'Вкажіть ім\'я дитини';
        } else if (childName.length < 2) {
            newErrors.child_name = 'Мінімум 2 символи';
        }

        const childAge = formData.get('child_age') as string;
        if (!childAge) {
            newErrors.child_age = 'Вкажіть вік дитини';
        } else {
            const age = parseInt(childAge, 10);
            if (isNaN(age) || age < 5 || age > 25) {
                newErrors.child_age = 'Вкажіть коректний вік (5-25 років)';
            }
        }

        if (!formData.get('format_satisfaction')) {
            newErrors.format_satisfaction = 'Оберіть один з варіантів';
        }

        if (!formData.get('explanation_quality')) {
            newErrors.explanation_quality = 'Оберіть один з варіантів';
        }

        const favoritePart = (formData.get('favorite_part') as string)?.trim() || '';
        if (!favoritePart) {
            newErrors.favorite_part = 'Це поле обов\'язкове';
        } else if (favoritePart.length < 5) {
            newErrors.favorite_part = 'Мінімум 5 символів';
        }

        if (!formData.get('progress_noticed')) {
            newErrors.progress_noticed = 'Оберіть один з варіантів';
        }

        if (!formData.get('duration')) {
            newErrors.duration = 'Оберіть один з варіантів';
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

        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
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
            <div className="max-w-2xl mx-auto">
                <div className="bg-white dark:bg-slate-900 p-12 rounded-lg border border-slate-200 dark:border-slate-800 text-center">
                    <CheckCircle2 className="w-16 h-16 text-lime-500 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Дякуємо за відповіді! 🎉
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                        Ваша думка дуже важлива для нас. Ми використаємо цю інформацію для покращення занять.
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
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                📋 Коротка анкета
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-2">
                для батьків та учнів
            </p>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8">
                Допоможіть нам стати кращими! Анкета займе лише 2-3 хвилини.
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
                {/* Хто заповнює */}
                <h2 className={sectionTitleClasses}>
                    Хто заповнює анкету? <span className="text-red-500">*</span>
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 -mt-2">
                    Ім'я та прізвище не потрібні
                </p>
                <div id="parent_type" className="flex gap-6 mb-2">
                    {[
                        { value: 'mom', label: 'Мама' },
                        { value: 'dad', label: 'Тато' },
                    ].map((option) => (
                        <label key={option.value} className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                name="parent_type"
                                value={option.value}
                                className={radioClasses}
                                required
                            />
                            <span className="ml-2 text-sm text-slate-900 dark:text-gray-300">{option.label}</span>
                        </label>
                    ))}
                </div>
                <ErrorMessage error={errors.parent_type} />

                {/* Дані дитини */}
                <h2 className={sectionTitleClasses}>
                    Про дитину <span className="text-red-500">*</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                    <div>
                        <label htmlFor="child_name" className={labelClasses}>
                            Ім'я дитини
                        </label>
                        <input
                            type="text"
                            id="child_name"
                            name="child_name"
                            className={errors.child_name ? inputErrorClasses : inputClasses}
                            placeholder="Наприклад: Олексій"
                            required
                            minLength={2}
                        />
                        <ErrorMessage error={errors.child_name} />
                    </div>
                    <div>
                        <label htmlFor="child_age" className={labelClasses}>
                            Скільки років
                        </label>
                        <input
                            type="number"
                            id="child_age"
                            name="child_age"
                            className={errors.child_age ? inputErrorClasses : inputClasses}
                            placeholder="Наприклад: 12"
                            min={5}
                            max={25}
                            required
                        />
                        <ErrorMessage error={errors.child_age} />
                    </div>
                </div>

                {/* 1. Формат занять */}
                <h2 className={sectionTitleClasses}>
                    1. Чи подобається дитині формат занять (ритм, тривалість, взаємодія)? <span className="text-red-500">*</span>
                </h2>
                <div id="format_satisfaction" className="flex flex-col gap-3 mb-2">
                    {[
                        { value: 'yes', label: 'Так' },
                        { value: 'mostly_yes', label: 'Скоріше так' },
                        { value: 'neutral', label: 'Нейтрально' },
                        { value: 'mostly_no', label: 'Скоріше ні' },
                        { value: 'no', label: 'Ні' },
                    ].map((option) => (
                        <label key={option.value} className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                name="format_satisfaction"
                                value={option.value}
                                className={radioClasses}
                                required
                            />
                            <span className="ml-2 text-sm text-slate-900 dark:text-gray-300">{option.label}</span>
                        </label>
                    ))}
                </div>
                <ErrorMessage error={errors.format_satisfaction} />

                <div className="mt-4 mb-6">
                    <label htmlFor="format_comment" className={labelClasses}>
                        Коментар (необов'язково)
                    </label>
                    <textarea
                        id="format_comment"
                        name="format_comment"
                        rows={2}
                        className={inputClasses}
                        placeholder="Ваш коментар..."
                    />
                </div>

                {/* 2. Спосіб пояснення */}
                <h2 className={sectionTitleClasses}>
                    2. Чи подобається дитині спосіб пояснення матеріалу? <span className="text-red-500">*</span>
                </h2>
                <div id="explanation_quality" className="flex flex-col gap-3 mb-2">
                    {[
                        { value: 'very_clear', label: 'Дуже зрозуміло' },
                        { value: 'clear', label: 'Зрозуміло' },
                        { value: 'sometimes_hard', label: 'Місцями складно' },
                        { value: 'often_hard', label: 'Часто складно' },
                    ].map((option) => (
                        <label key={option.value} className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                name="explanation_quality"
                                value={option.value}
                                className={radioClasses}
                                required
                            />
                            <span className="ml-2 text-sm text-slate-900 dark:text-gray-300">{option.label}</span>
                        </label>
                    ))}
                </div>
                <ErrorMessage error={errors.explanation_quality} />

                {/* 3. Що найбільше подобається */}
                <h2 className={sectionTitleClasses}>
                    3. Що найбільше подобається на заняттях? <span className="text-red-500">*</span>
                </h2>
                <div className="mb-2">
                    <textarea
                        id="favorite_part"
                        name="favorite_part"
                        rows={3}
                        className={errors.favorite_part ? inputErrorClasses : inputClasses}
                        placeholder="Наприклад: практичні завдання, ігрові елементи, створення власних проєктів..."
                        required
                        minLength={5}
                    />
                </div>
                <ErrorMessage error={errors.favorite_part} />

                {/* 4. Прогрес */}
                <h2 className={sectionTitleClasses}>
                    4. Чи помічаєте ви прогрес або зацікавленість дитини у програмуванні / створенні сайтів? <span className="text-red-500">*</span>
                </h2>
                <div id="progress_noticed" className="flex flex-col gap-3 mb-2">
                    {[
                        { value: 'yes_notable', label: 'Так, помітно' },
                        { value: 'yes_want_more', label: 'Так, але хотілося б більше' },
                        { value: 'not_really', label: 'Поки що не дуже' },
                        { value: 'no_opinion', label: 'Поки не сформувалася думка' },
                    ].map((option) => (
                        <label key={option.value} className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                name="progress_noticed"
                                value={option.value}
                                className={radioClasses}
                                required
                            />
                            <span className="ml-2 text-sm text-slate-900 dark:text-gray-300">{option.label}</span>
                        </label>
                    ))}
                </div>
                <ErrorMessage error={errors.progress_noticed} />

                {/* 5. Тривалість занять */}
                <h2 className={sectionTitleClasses}>
                    5. Скільки часу тривають або тривали заняття? <span className="text-red-500">*</span>
                </h2>
                <div id="duration" className="flex flex-col gap-3 mb-2">
                    {[
                        { value: 'less_6_months', label: 'Менше 6 місяців' },
                        { value: '6_to_12_months', label: 'Від 6 до 12 місяців' },
                        { value: '1_to_2_years', label: 'Від 1 до 2 років' },
                        { value: '2_to_3_years', label: 'Від 2 до 3 років' },
                        { value: 'more_3_years', label: 'Більше 3 років' },
                    ].map((option) => (
                        <label key={option.value} className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                name="duration"
                                value={option.value}
                                className={radioClasses}
                                required
                            />
                            <span className="ml-2 text-sm text-slate-900 dark:text-gray-300">{option.label}</span>
                        </label>
                    ))}
                </div>
                <ErrorMessage error={errors.duration} />

                {/* Додаткові коментарі */}
                <h2 className={sectionTitleClasses}>
                    Додаткові побажання або коментарі
                </h2>
                <div className="mb-6">
                    <textarea
                        id="additional_comments"
                        name="additional_comments"
                        rows={3}
                        className={inputClasses}
                        placeholder="Якщо є щось, чим хочете поділитися... (необов'язково)"
                    />
                </div>

                {/* Hidden field to identify form type */}
                <input type="hidden" name="form_type" value="parent_survey" />

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-lime-600 hover:bg-lime-700 dark:bg-lime-500 dark:hover:bg-lime-600 text-white dark:text-slate-900 font-bold py-3 px-6 rounded-lg transition mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                        'Надіслати відповіді'
                    )}
                </button>
            </form>
        </div>
    );
}
