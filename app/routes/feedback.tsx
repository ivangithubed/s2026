import { useState } from 'react';

export default function FeedbackPage() {
    const [displayNameType, setDisplayNameType] = useState('');

    const inputClasses = "bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-400 dark:focus:border-lime-400";
    const labelClasses = "block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300";
    const sectionTitleClasses = "text-xl font-semibold text-lime-600 dark:text-lime-400 mb-4 mt-8 flex items-center gap-2";
    const radioClasses = "w-4 h-4 text-lime-600 bg-slate-100 border-slate-300 focus:ring-lime-500 dark:focus:ring-lime-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600";

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                🌿 Опитування для випускників
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
                Дякую, що знайшов(-ла) час поділитися враженнями!
            </p>

            <form
                method="post"
                action="https://formspree.io/f/mwpgbjow"
                className="bg-white dark:bg-slate-900 p-8 rounded-lg border border-slate-200 dark:border-slate-800"
            >
                {/* 1. Загальна атмосфера */}
                <h2 className={sectionTitleClasses}>
                    <span>1.</span> Загальна атмосфера
                </h2>

                <div className="mb-6">
                    <label htmlFor="general_impression" className={labelClasses}>
                        Яке загальне враження залишилося після курсу?
                    </label>
                    <textarea
                        id="general_impression"
                        name="general_impression"
                        rows={3}
                        className={inputClasses}
                        placeholder="Опишіть ваші враження..."
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="liked_style" className={labelClasses}>
                        Що найбільше сподобалось у стилі проведення занять?
                    </label>
                    <textarea
                        id="liked_style"
                        name="liked_style"
                        rows={3}
                        className={inputClasses}
                        placeholder="Що вам сподобалось..."
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="three_words" className={labelClasses}>
                        Як би ти описав(-ла) атмосферу на курсі трьома словами?
                    </label>
                    <input
                        type="text"
                        id="three_words"
                        name="three_words"
                        className={inputClasses}
                        placeholder="Наприклад: дружня, продуктивна, натхненна"
                    />
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
                        Що в підході ментора тобі запам'яталося найбільше?
                    </label>
                    <textarea
                        id="mentor_memorable"
                        name="mentor_memorable"
                        rows={3}
                        className={inputClasses}
                        placeholder="Ваша відповідь..."
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="mentor_best" className={labelClasses}>
                        Що у взаємодії з ментором працювало найкраще?
                    </label>
                    <textarea
                        id="mentor_best"
                        name="mentor_best"
                        rows={3}
                        className={inputClasses}
                        placeholder="Ваша відповідь..."
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="felt_support" className={labelClasses}>
                        Чи відчував(-ла) ти підтримку протягом навчання?
                    </label>
                    <textarea
                        id="felt_support"
                        name="felt_support"
                        rows={2}
                        className={inputClasses}
                        placeholder="Ваша відповідь..."
                    />
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
                        Що приємно здивувало під час навчання?
                    </label>
                    <textarea
                        id="pleasant_surprise"
                        name="pleasant_surprise"
                        rows={3}
                        className={inputClasses}
                        placeholder="Ваша відповідь..."
                    />
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
                        placeholder="Ваша відповідь..."
                    />
                </div>

                {/* 4. Особисті відчуття та досвід */}
                <h2 className={sectionTitleClasses}>
                    <span>4.</span> Особисті відчуття та досвід
                </h2>

                <div className="mb-6">
                    <label htmlFor="wow_moment" className={labelClasses}>
                        Який момент або урок став для тебе найбільш «вау»?
                    </label>
                    <textarea
                        id="wow_moment"
                        name="wow_moment"
                        rows={3}
                        className={inputClasses}
                        placeholder="Ваша відповідь..."
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="still_using" className={labelClasses}>
                        Що з курсу ти продовжуєш використовувати або згадуєш найчастіше?
                    </label>
                    <textarea
                        id="still_using"
                        name="still_using"
                        rows={3}
                        className={inputClasses}
                        placeholder="Ваша відповідь..."
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="motivation" className={labelClasses}>
                        Що допомогло тобі не втратити мотивацію під час навчання?
                    </label>
                    <textarea
                        id="motivation"
                        name="motivation"
                        rows={3}
                        className={inputClasses}
                        placeholder="Ваша відповідь..."
                    />
                </div>

                {/* 5. Підтримка поза уроками */}
                <h2 className={sectionTitleClasses}>
                    <span>5.</span> Підтримка поза уроками
                </h2>

                <div className="mb-6">
                    <label htmlFor="feedback_sufficient" className={labelClasses}>
                        Чи було достатньо зворотного зв'язку під час виконання завдань?
                    </label>
                    <textarea
                        id="feedback_sufficient"
                        name="feedback_sufficient"
                        rows={2}
                        className={inputClasses}
                        placeholder="Ваша відповідь..."
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="chat_convenience" className={labelClasses}>
                        Наскільки зручно було отримувати допомогу у чаті/ком'юніті?
                    </label>
                    <textarea
                        id="chat_convenience"
                        name="chat_convenience"
                        rows={2}
                        className={inputClasses}
                        placeholder="Ваша відповідь..."
                    />
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
                        placeholder="Ваші пропозиції..."
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="recommend_why" className={labelClasses}>
                        Чи порадиш ти цей курс іншим? Чому?
                    </label>
                    <textarea
                        id="recommend_why"
                        name="recommend_why"
                        rows={3}
                        className={inputClasses}
                        placeholder="Ваша відповідь..."
                    />
                </div>

                {/* 7. Дозвіл */}
                <h2 className={sectionTitleClasses}>
                    <span>7.</span> Дозвіл
                </h2>

                <div className="mb-6">
                    <label className={labelClasses}>
                        Чи можна використати твій відгук у маркетингових матеріалах?
                    </label>
                    <div className="flex gap-6 mt-2">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="marketing_permission"
                                value="yes"
                                className={radioClasses}
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
                </div>

                <div className="mb-6">
                    <label className={labelClasses}>
                        Як вказати тебе на сайті з коментарем?
                    </label>
                    <div className="flex flex-col gap-3 mt-2">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="display_name_type"
                                value="first_name"
                                className={radioClasses}
                                onChange={(e) => setDisplayNameType(e.target.value)}
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
                </div>

                {displayNameType && displayNameType !== 'anonymous' && (
                    <div className="mb-6">
                        <label htmlFor="display_name" className={labelClasses}>
                            {displayNameType === 'first_name' && "Вкажіть ваше ім'я:"}
                            {displayNameType === 'nickname' && "Вкажіть ваш нікнейм:"}
                            {displayNameType === 'full_name' && "Вкажіть ваше ім'я та прізвище:"}
                        </label>
                        <input
                            type="text"
                            id="display_name"
                            name="display_name"
                            className={inputClasses}
                            placeholder={
                                displayNameType === 'first_name' ? "Наприклад: Олена" :
                                    displayNameType === 'nickname' ? "Наприклад: @developer_ua" :
                                        "Наприклад: Олена Петренко"
                            }
                        />
                    </div>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-lime-600 hover:bg-lime-700 dark:bg-lime-500 dark:hover:bg-lime-600 text-white dark:text-slate-900 font-bold py-3 px-6 rounded-lg transition mt-8"
                >
                    Надіслати відгук
                </button>
            </form>
        </div>
    );
}
