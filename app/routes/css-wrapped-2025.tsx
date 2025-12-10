import { motion } from 'framer-motion';
import { ExternalLink, ChevronDown, Book, Code2, Play } from 'lucide-react';
import { Link } from 'react-router';

// Компонент для посилань на ресурси
function ResourceLink({ href, children, icon: Icon }: { href: string; children: React.ReactNode; icon?: React.ComponentType<{ className?: string }> }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-lime-600 dark:text-lime-400 hover:underline"
        >
            {Icon && <Icon className="w-4 h-4" />}
            {children}
            <ExternalLink className="w-3 h-3" />
        </a>
    );
}

// Компонент для CodePen вбудовування
function CodePenEmbed({ penId, title }: { penId: string; title: string }) {
    return (
        <div className="my-6 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <iframe
                height="450"
                className="w-full"
                scrolling="no"
                title={title}
                src={`https://codepen.io/web-dot-dev/embed/${penId}?default-tab=result&theme-id=dark`}
                frameBorder="no"
                loading="lazy"
                allowFullScreen
            >
                Дивитись <a href={`https://codepen.io/web-dot-dev/pen/${penId}`}>{title}</a> на CodePen.
            </iframe>
        </div>
    );
}

// Компонент для блоку коду
function CodeBlock({ children, language = 'css' }: { children: string; language?: string }) {
    return (
        <pre className="my-4 p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
            <code className={`language-${language}`}>{children}</code>
        </pre>
    );
}

// Компонент секції
function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
    return (
        <section id={id} className="py-12 border-b border-gray-200 dark:border-gray-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <a href={`#${id}`} className="text-lime-600 dark:text-lime-400 hover:underline">#</a>
                {title}
            </h3>
            {children}
        </section>
    );
}

// Компонент підсекції
function SubSection({ id, title, subtitle, children }: { id: string; title: string; subtitle?: string; children: React.ReactNode }) {
    return (
        <div id={id} className="py-8">
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                <a href={`#${id}`} className="text-lime-500 hover:underline mr-2">#</a>
                {title}
            </h4>
            {subtitle && (
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4 italic">{subtitle}</p>
            )}
            {children}
        </div>
    );
}

export default function CSSWrapped2025() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
            {/* Hero Section */}
            <header className="relative py-20 px-4 text-center overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Disclaimer */}
                    <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg text-amber-800 dark:text-amber-200">
                        <p className="text-sm">
                            🌐 Це <strong>неофіційний переклад</strong> статті{' '}
                            <a
                                href="https://chrome.dev/css-wrapped-2025/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:no-underline"
                            >
                                CSS Wrapped 2025
                            </a>{' '}
                            від Chrome DevRel команди. Переклад зроблено для україномовної спільноти розробників.
                            Оригінальний контент належить Google/Chrome.
                        </p>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                        CSS Wrapped <span className="text-lime-500">2025</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                        Українською 🇺🇦
                    </p>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                        Цього року ми даємо вам нові інструменти для <em>створення</em> динамічного вебу.
                        <strong> Створюйте</strong> динамічні інтерфейси, <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">розширюйте</code> свою уяву
                        та <strong>грайтесь</strong> з цими потужними новими CSS-функціями.
                    </p>

                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-gray-400"
                    >
                        <ChevronDown className="w-8 h-8 mx-auto" />
                        <p className="text-sm mt-2">Прокрутіть вниз, щоб дослідити</p>
                    </motion.div>
                </motion.div>
            </header>

            {/* Intro */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-xl text-gray-700 dark:text-gray-300">
                        Ми створювали нові функції з думкою про <em>вас</em>. Готові побачити, що ми сформували у 2025 році?
                        Chrome DevRel команда проведе вас через <strong>22 CSS та UI функції</strong>, які з'явились на веб-платформі.
                    </p>
                </div>

                {/* Table of Contents */}
                <nav className="my-12 p-6 bg-gray-100 dark:bg-gray-800/50 rounded-xl">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Зміст</h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <h3 className="font-semibold text-lime-600 dark:text-lime-400 mb-3">🧩 Кастомізовані компоненти</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#invoker-commands" className="hover:text-lime-600 dark:hover:text-lime-400">Invoker Commands</a></li>
                                <li><a href="#dialog-light-dismiss" className="hover:text-lime-600 dark:hover:text-lime-400">Dialog Light Dismiss</a></li>
                                <li><a href="#popover-hint" className="hover:text-lime-600 dark:hover:text-lime-400">popover=hint</a></li>
                                <li><a href="#customizable-select" className="hover:text-lime-600 dark:hover:text-lime-400">Customizable select</a></li>
                                <li><a href="#scroll-marker-button" className="hover:text-lime-600 dark:hover:text-lime-400">::scroll-marker/button()</a></li>
                                <li><a href="#scroll-target-group" className="hover:text-lime-600 dark:hover:text-lime-400">scroll-target-group</a></li>
                                <li><a href="#anchored-container-queries" className="hover:text-lime-600 dark:hover:text-lime-400">Anchored container queries</a></li>
                                <li><a href="#interest-invokers" className="hover:text-lime-600 dark:hover:text-lime-400">Interest invokers</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lime-600 dark:text-lime-400 mb-3">⚡ Взаємодії нового покоління</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#scroll-state-queries" className="hover:text-lime-600 dark:hover:text-lime-400">Scroll-state queries</a></li>
                                <li><a href="#tree-counting-functions" className="hover:text-lime-600 dark:hover:text-lime-400">Tree counting functions</a></li>
                                <li><a href="#scrollintoview-container" className="hover:text-lime-600 dark:hover:text-lime-400">scrollIntoView() container</a></li>
                                <li><a href="#nested-view-transition-groups" className="hover:text-lime-600 dark:hover:text-lime-400">Nested View Transition Groups</a></li>
                                <li><a href="#dom-state-preserving-move" className="hover:text-lime-600 dark:hover:text-lime-400">DOM State-Preserving Move</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lime-600 dark:text-lime-400 mb-3">🛠️ Оптимізована ергономіка</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#advanced-attr-function" className="hover:text-lime-600 dark:hover:text-lime-400">Розширена функція attr()</a></li>
                                <li><a href="#toggleevent-source" className="hover:text-lime-600 dark:hover:text-lime-400">ToggleEvent.source</a></li>
                                <li><a href="#text-box-features" className="hover:text-lime-600 dark:hover:text-lime-400">text-box features</a></li>
                                <li><a href="#shape-function" className="hover:text-lime-600 dark:hover:text-lime-400">Функція shape()</a></li>
                                <li><a href="#if-statements" className="hover:text-lime-600 dark:hover:text-lime-400">if() statements</a></li>
                                <li><a href="#custom-functions" className="hover:text-lime-600 dark:hover:text-lime-400">Custom Functions</a></li>
                                <li><a href="#expanded-range-syntax" className="hover:text-lime-600 dark:hover:text-lime-400">Expanded range syntax</a></li>
                                <li><a href="#stretch-sizing-keyword" className="hover:text-lime-600 dark:hover:text-lime-400">Stretch sizing keyword</a></li>
                                <li><a href="#corner-shape" className="hover:text-lime-600 dark:hover:text-lime-400">corner-shape</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* Section 1: Customizable Components */}
                <Section id="customizable-components" title="🧩 Кастомізовані компоненти">
                    <p className="text-gray-700 dark:text-gray-300 mb-8">
                        Цього року було спекотно в майстерні. Ми взяли десятилітню проблему стилізації випадаючих списків
                        і довели її до досконалості. Також ми випустили нові базові блоки, такі як нативне anchor positioning
                        та API для каруселей з прокруткою.
                    </p>

                    {/* Invoker Commands */}
                    <SubSection
                        id="invoker-commands"
                        title="Invoker Commands"
                        subtitle="Показуйте <dialog> модально (і не тільки) без JavaScript!"
                    >
                        <div className="flex flex-wrap gap-3 mb-4">
                            <ResourceLink href="https://codepen.io/web-dot-dev/pen/pvyVyYK" icon={Play}>Демо</ResourceLink>
                            <ResourceLink href="https://developer.chrome.com/blog/command-and-commandfor" icon={Book}>Chrome for Developers</ResourceLink>
                            <ResourceLink href="https://developer.mozilla.org/docs/Web/API/Invoker_Commands_API" icon={Book}>MDN</ResourceLink>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Щоб відкрити <code>&lt;dialog&gt;</code> модально, натиснувши на <code>&lt;button&gt;</code>,
                            зазвичай потрібен обробник <code>onclick</code>, який викликає метод <code>showModal</code> на цьому діалозі.
                        </p>

                        <CodeBlock language="html">{`<button onclick="document.querySelector('#my-dialog').showModal();">Показати діалог</button>
<dialog id="my-dialog">…</dialog>`}</CodeBlock>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            З invoker commands — доступними з Chrome 135 — кнопки тепер можуть виконувати дії над іншими елементами
                            декларативно, без потреби в JavaScript.
                        </p>

                        <CodeBlock language="html">{`<button commandfor="my-dialog" command="show-modal">Показати діалог</button>
<dialog id="my-dialog">…</dialog>`}</CodeBlock>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Атрибут <code>commandfor</code> приймає ID — подібно до атрибута <code>for</code> — тоді як
                            <code>command</code> приймає вбудовані значення, що забезпечує більш портативний та інтуїтивний підхід.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Наразі можна надсилати команди до <code>[popover]</code> та <code>&lt;dialog&gt;</code> елементів,
                            з можливістю додавання інших типів елементів у майбутньому. Команди відповідають їхнім JavaScript-аналогам:
                        </p>

                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-1">
                            <li><code>show-popover</code>: <code>el.showPopover()</code></li>
                            <li><code>hide-popover</code>: <code>el.hidePopover()</code></li>
                            <li><code>toggle-popover</code>: <code>el.togglePopover()</code></li>
                            <li><code>show-modal</code>: <code>dialogEl.showModal()</code></li>
                            <li><code>close</code>: <code>dialogEl.close()</code></li>
                        </ul>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Також можна налаштувати власні команди для надсилання елементам. Ці кастомні команди починаються
                            з двох дефісів і обробляються подією <code>toggle</code>.
                        </p>

                        <CodeBlock language="html">{`<button commandfor="some-element" command="--show-confetti">🎉</button>`}</CodeBlock>

                        <CodeBlock language="javascript">{`document.querySelector('#some-element').addEventListener('command', (e) => {
  if (e.command === "--show-confetti") {
    // …
  }
});`}</CodeBlock>

                        <p className="text-gray-700 dark:text-gray-300">
                            Доступний <ResourceLink href="https://github.com/keithamus/invokers-polyfill">поліфіл для Invoker Commands</ResourceLink>.
                        </p>
                    </SubSection>

                    {/* Dialog Light Dismiss */}
                    <SubSection
                        id="dialog-light-dismiss"
                        title="Dialog Light Dismiss"
                        subtitle="Приємна функція Popover API тепер доступна для <dialog>."
                    >
                        <div className="flex flex-wrap gap-3 mb-4">
                            <ResourceLink href="https://codepen.io/web-dot-dev/pen/PwNeNLp" icon={Play}>Демо</ResourceLink>
                            <ResourceLink href="https://developer.mozilla.org/docs/Web/API/HTMLDialogElement/closedBy" icon={Book}>MDN</ResourceLink>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Одна з приємних функцій, представлених Popover API — це поведінка light dismiss для попаверів.
                            Вона дозволяє користувачам закривати попавер, клікнувши поза ним — на <code>::backdrop</code> —
                            або натиснувши клавішу ESC.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            З Chrome 134 ця поведінка light dismiss також доступна для <code>&lt;dialog&gt;</code>
                            через новий атрибут <code>closedby</code>, який контролює поведінку:
                        </p>

                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-1">
                            <li><code>&lt;dialog closedby="none"&gt;</code>: Жодного закриття діалогу користувачем. Це поведінка за замовчуванням.</li>
                            <li><code>&lt;dialog closedby="closerequest"&gt;</code>: Натискання ESC (або інший тригер закриття) закриває діалог</li>
                            <li><code>&lt;dialog closedby="any"&gt;</code>: Клік поза діалогом або натискання ESC закриває діалог. Подібно до поведінки <code>popover="auto"</code>.</li>
                        </ul>
                    </SubSection>

                    {/* popover=hint */}
                    <SubSection
                        id="popover-hint"
                        title='popover="hint"'
                        subtitle="Ефемерні попавери, які не закривають інші."
                    >
                        <div className="flex flex-wrap gap-3 mb-4">
                            <ResourceLink href="https://codepen.io/web-dot-dev/pen/PwNJNLg" icon={Play}>Демо</ResourceLink>
                            <ResourceLink href="https://developer.chrome.com/blog/popover-hint" icon={Book}>Chrome for Developers</ResourceLink>
                            <ResourceLink href="https://developer.mozilla.org/docs/Web/HTML/Global_attributes/popover" icon={Book}>MDN</ResourceLink>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Hint-попавери з <code>popover="hint"</code> — це новий тип HTML-попаверів, призначений для ефемерних
                            шаруватих UI-патернів, таких як підказки або попередній перегляд посилань. Відкриття hint-попавера
                            не закриває інші відкриті auto чи manual попавери, дозволяючи шаруватим UI-елементам співіснувати.
                        </p>

                        <CodeBlock language="html">{`<button interestfor="callout-1"></button>
<div id="callout-1" popover=hint>
  Інформація про продукт тут.
</div>`}</CodeBlock>

                        <p className="text-gray-700 dark:text-gray-300">
                            Використання <code>popover="hint"</code> разом з <a href="#interest-invokers" className="text-lime-600 dark:text-lime-400 hover:underline">interest invokers</a> (атрибут <code>[interestfor]</code>)
                            значно спрощує створення шаруватих UI-елементів, таких як підказки, hover-картки та попередній перегляд
                            декларативно в HTML та CSS, без складних JavaScript-обхідних шляхів.
                        </p>
                    </SubSection>

                    {/* Customizable select */}
                    <SubSection
                        id="customizable-select"
                        title="Customizable select"
                        subtitle="Нарешті можна стилізувати HTML select елементи за допомогою CSS."
                    >
                        <div className="flex flex-wrap gap-3 mb-4">
                            <ResourceLink href="https://codepen.io/web-dot-dev/pen/JoXrKoL" icon={Play}>Демо</ResourceLink>
                            <ResourceLink href="https://developer.chrome.com/blog/a-customizable-select" icon={Book}>Chrome for Developers</ResourceLink>
                            <ResourceLink href="https://developer.mozilla.org/Learn_web_development/Extensions/Forms/Customizable_select" icon={Book}>MDN</ResourceLink>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Нарешті настав час: тепер ви можете повністю кастомізувати HTML <code>&lt;select&gt;</code> елемент за допомогою CSS!
                        </p>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Щоб почати, застосуйте властивість CSS <code>appearance: base-select</code> до вашого <code>&lt;select&gt;</code> елемента.
                            Це переведе його в новий, мінімальний стан, оптимізований для кастомізації.
                        </p>

                        <CodeBlock language="css">{`select {
  &::picker(select) {
    appearance: base-select;
  }
}`}</CodeBlock>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Використання base-select відкриває кілька потужних функцій, включаючи повну CSS-кастомізацію.
                            Кожна частина select-елемента, включаючи кнопку, випадаючий список та опції, може бути стилізована за допомогою CSS.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Новий select також дозволяє включати та правильно рендерити HTML-елементи, такі як <code>&lt;img&gt;</code>
                            та <code>&lt;span&gt;</code>, прямо всередині <code>&lt;option&gt;</code> елементів.
                        </p>

                        <div className="flex flex-wrap gap-3">
                            <ResourceLink href="https://codepen.io/collection/BNZjPe" icon={Code2}>Колекція демо на CodePen</ResourceLink>
                            <ResourceLink href="https://open-ui.org/components/customizableselect/" icon={Book}>OpenUI Explainer</ResourceLink>
                        </div>
                    </SubSection>

                    {/* ::scroll-marker/button() */}
                    <SubSection
                        id="scroll-marker-button"
                        title="::scroll-marker/button()"
                        subtitle="Карусельні scroll-афорданси з нативними CSS псевдо-елементами."
                    >
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Цього року створення каруселей та інших scroll-досвідів у CSS стало набагато простішим
                            завдяки двом новим псевдо-елементам: <code>::scroll-button()</code> та <code>::scroll-marker()</code>.
                            Ці функції дозволяють створювати нативні, доступні та продуктивні каруселі лише кількома рядками CSS,
                            без потреби в JavaScript.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Карусель — це по суті область з прокруткою з доданими UI-афордансами для навігації:
                            кнопками для прокрутки вперед-назад та маркерами для індикації поточної позиції.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Псевдо-елемент <code>::scroll-button()</code> створює надані браузером, статусні та інтерактивні
                            кнопки прокрутки. Ви можете створювати кнопки для будь-якого напрямку прокрутки:
                            <code>left</code>, <code>right</code>, <code>up</code>, <code>down</code>, а також логічні
                            напрямки як <code>block-start</code> та <code>inline-end</code>.
                        </p>

                        <CodeBlock language="css">{`.carousel::scroll-button(left) {
  content: "⬅" / "Прокрутити вліво";
}

.carousel::scroll-button(right) {
  content: "⮕" / "Прокрутити вправо";
}`}</CodeBlock>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Псевдо-елемент <code>::scroll-marker</code> представляє маркер для елемента всередині
                            scroll-контейнера. Ці маркери групуються в <code>::scroll-marker-group</code> і поводяться
                            як anchor-посилання, дозволяючи користувачам переходити безпосередньо до конкретного елемента.
                        </p>

                        <CodeBlock language="css">{`.carousel {
  scroll-marker-group: after;
}

.carousel > li::scroll-marker {
  content: ' ';
  width: 1em;
  height: 1em;
  border: 1px solid black;
  border-radius: 50%;
}

.carousel > li::scroll-marker:target-current {
  background: black;
}`}</CodeBlock>
                    </SubSection>

                    {/* scroll-target-group */}
                    <SubSection
                        id="scroll-target-group"
                        title="scroll-target-group"
                        subtitle="Перетворіть список anchor-посилань на з'єднані scroll-маркери."
                    >
                        <div className="flex flex-wrap gap-3 mb-4">
                            <ResourceLink href="https://codepen.io/web-dot-dev/pen/azNjGpv" icon={Play}>Демо</ResourceLink>
                            <ResourceLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-target-group" icon={Book}>MDN</ResourceLink>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            На додаток до псевдо-елементів <code>::scroll-button()</code> та <code>::scroll-marker</code>,
                            CSS-каруселі включають ще одну класну функцію: <code>scroll-target-group</code>.
                            Вона позначає елемент як контейнер для групи навігаційних елементів, наприклад, змісту.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Поєднайте <code>scroll-target-group</code> з псевдо-класом <code>:target-current</code>,
                            щоб стилізувати anchor-елемент, ціль якого зараз видима. Це дає вам силу <code>::scroll-marker</code>,
                            але з гнучкістю використання власних HTML-елементів для маркерів.
                        </p>

                        <CodeBlock language="html">{`<nav class="toc">
  <ul>
    <li><a href="#section-1">Секція 1</a></li>
    <li><a href="#section-2">Секція 2</a></li>
    <li><a href="#section-3">Секція 3</a></li>
  </ul>
</nav>

<main>
  <section id="section-1">...</section>
  <section id="section-2">...</section>
  <section id="section-3">...</section>
</main>`}</CodeBlock>

                        <CodeBlock language="css">{`.toc {
  scroll-target-group: auto;
}

.toc a:target-current {
  color: red;
  font-weight: bold;
}`}</CodeBlock>
                    </SubSection>

                    {/* Anchored container queries */}
                    <SubSection
                        id="anchored-container-queries"
                        title="Anchored container queries"
                        subtitle="Стилізуйте елементи на основі їхньої anchor-позиції."
                    >
                        <div className="flex flex-wrap gap-3 mb-4">
                            <ResourceLink href="https://codepen.io/web-dot-dev/pen/jEWKRRv" icon={Play}>Демо</ResourceLink>
                            <ResourceLink href="https://developer.chrome.com/blog/anchored-container-queries" icon={Book}>Chrome for Developers</ResourceLink>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Минулорічний CSS Wrapped охоплював CSS anchor positioning: захоплююче оновлення, яке змінює спосіб
                            позиціонування елементів відносно один одного. З того часу воно стало частиною Interop 2025,
                            і підтримка браузерами розширилась.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Однак, хоча CSS міг переміщувати елемент до fallback-позиції, він не мав способу дізнатися,
                            який fallback було обрано. Це означало, що якщо ваш tooltip перевертався знизу вгору екрана,
                            стрілка все ще вказувала б у неправильному напрямку. Тепер це вирішено за допомогою anchored container queries.
                        </p>

                        <CodeBlock language="css">{`/* Елемент, до якого прив'язаний tooltip */
.anchor {
  anchor-name: --my-anchor;
}

/* Позиціонований елемент (tooltip) */
.tooltip {
  position: fixed;
  position-anchor: --my-anchor;
  position-area: bottom;
  position-try-fallbacks: flip-block;

  /* Робимо його anchored query контейнером */
  container-type: anchored;
}

/* Використовуємо anchored query для перевірки fallback */
@container anchored(fallback: flip-block) {
  .tooltip::before {
    /* Використано 'top' fallback, тому перевертаємо стрілку */
    content: '▼';
    top: 100%;
  }
}`}</CodeBlock>

                        <p className="text-gray-700 dark:text-gray-300">
                            Це величезна перемога для anchor positioning та бібліотек компонентів, що дозволяє створювати
                            більш надійні та самодостатні UI-елементи з меншим кодом.
                        </p>
                    </SubSection>

                    {/* Interest invokers */}
                    <SubSection
                        id="interest-invokers"
                        title="Interest invokers"
                        subtitle="Декларативний UI, що активується інтересом, з interestfor."
                    >
                        <div className="flex flex-wrap gap-3 mb-4">
                            <ResourceLink href="https://codepen.io/web-dot-dev/pen/VYaWyoQ" icon={Play}>Демо</ResourceLink>
                            <ResourceLink href="https://developer.mozilla.org/docs/Web/API/Popover_API/Using_interest_invokers" icon={Book}>MDN</ResourceLink>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            UI, що активується наведенням та фокусом, є скрізь у вебі — від tooltips до багатих hover-карток
                            та попереднього перегляду сторінок. Хоча цей патерн часто добре працює для користувачів миші,
                            він може бути недоступним для інших модальностей, як-от сенсорний екран.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Новий атрибут <code>interestfor</code> вирішує цю проблему, надаючи нативний, декларативний
                            спосіб стилізації елемента, коли користувачі "виявляють інтерес" до нього без повної активації.
                        </p>

                        <CodeBlock language="html">{`<button interestfor="callout-1"></button>

<div id="callout-1" popover="hint">
  Інформація про продукт тут.
</div>`}</CodeBlock>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            <strong>Примітка:</strong> На відміну від command invokers, які працюють лише на кнопках,
                            interest invokers можуть бути встановлені на посиланнях (<code>&lt;a&gt;</code>) так само як і на кнопках.
                        </p>

                        <h5 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">Interest Delays</h5>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Ще одна нова функція — можливість встановлювати затримки інтересу. Це запобігає
                            занадто передчасному спрацюванню interest-invoked елемента. Ви можете встановити затримку
                            як для відкриття, так і для закриття за допомогою властивості <code>interest-delay</code>.
                        </p>

                        <CodeBlock language="css">{`/* застосовує оновлене значення затримки на кнопку interest-invoking */
[interestfor] {
  interest-delay: 0.2s;
}`}</CodeBlock>

                        <div className="flex flex-wrap gap-3">
                            <ResourceLink href="https://open-ui.org/components/interest-invokers.explainer/" icon={Book}>Open UI explainer</ResourceLink>
                            <ResourceLink href="https://github.com/mfreed7/interestfor" icon={Code2}>Поліфіл interestfor</ResourceLink>
                        </div>
                    </SubSection>
                </Section>

                {/* Section 2: Next-gen Interactions */}
                <Section id="next-gen-interactions" title="⚡ Взаємодії нового покоління">
                    <p className="text-gray-700 dark:text-gray-300 mb-8">
                        З цим новим інструментарієм взаємодій ви тепер можете анімувати переходи між сторінками
                        за допомогою view transitions та створювати чудові scroll-based досвіди.
                    </p>

                    {/* Scroll-state queries */}
                    <SubSection
                        id="scroll-state-queries"
                        title="Scroll-state queries"
                        subtitle="Стилізуйте нащадків залежно від того, чи є щось scrollable, stuck або snapped."
                    >
                        <div className="flex flex-wrap gap-3 mb-4">
                            <ResourceLink href="https://codepen.io/web-dot-dev/pen/XJrqpBG" icon={Play}>Демо</ResourceLink>
                            <ResourceLink href="https://developer.chrome.com/blog/css-scroll-state-queries" icon={Book}>Chrome for Developers</ResourceLink>
                            <ResourceLink href="https://developer.mozilla.org/docs/Web/CSS/CSS_conditional_rules/Container_scroll-state_queries" icon={Book}>MDN</ResourceLink>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Щоб визначити, чи елемент stuck, snapped або scrollable, раніше потрібно було використовувати
                            купу JavaScript... що не завжди легко зробити, бо треба прикріплювати таймаути до scroll-подій тощо.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Завдяки scroll-state queries — доступним з Chrome 133 — ви можете використовувати CSS для
                            декларативної та більш продуктивної стилізації елементів у цих станах.
                        </p>

                        <CodeBlock language="css">{`.parent {
  container-type: scroll-state;
}`}</CodeBlock>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Після цього дочірні елементи можуть запитувати, чи батьківський елемент у певному scroll-state:
                        </p>

                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-1">
                            <li><strong>Stuck state:</strong> коли елемент прилипає.</li>
                            <li><strong>Snapped state:</strong> коли елемент snap-нутий.</li>
                            <li><strong>Scrollable state:</strong> коли елемент має overflow.</li>
                        </ul>

                        <CodeBlock language="css">{`.scroller {
  overflow-x: scroll;
  scroll-snap-type: x mandatory;

  > div {
    container-type: scroll-state;
    scroll-snap-align: center;

    @supports (container-type: scroll-state) {
      > * {
        transition: opacity .5s ease;

        @container not scroll-state(snapped: x) {
          opacity: .25;
        }
      }
    }
  }
}`}</CodeBlock>
                    </SubSection>

                    {/* Tree counting functions */}
                    <SubSection
                        id="tree-counting-functions"
                        title="Tree counting functions"
                        subtitle="Поступові анімації, хтось?"
                    >
                        <div className="flex flex-wrap gap-3 mb-4">
                            <ResourceLink href="https://codepen.io/web-dot-dev/pen/vEGjGwG" icon={Play}>Демо</ResourceLink>
                            <ResourceLink href="https://utilitybend.com/blog/styling-siblings-with-CSS-has-never-been-easier.-Experimenting-with-sibling-count-and-sibling-index/" icon={Book}>Chrome for Developers</ResourceLink>
                            <ResourceLink href="https://developer.mozilla.org/docs/Web/CSS/Reference/Values/sibling-index" icon={Book}>MDN</ResourceLink>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Звичайний метод створення поступових (staggered) анімацій для елементів списку, де кожен елемент
                            з'являється послідовно, вимагає підрахунку DOM-елементів і жорсткого кодування цих значень
                            у custom properties (наприклад, <code>--index: 1;</code>, <code>--index: 2;</code>) за допомогою селекторів <code>:nth-child</code>.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Нові функції <code>sibling-index()</code> та <code>sibling-count()</code> полегшують життя,
                            оскільки надають нативну обізнаність про позицію елемента серед його сусідів.
                        </p>

                        <CodeBlock language="css">{`li {
  /* Створюємо поступову затримку. */
  /* Віднімаємо 1, бо sibling-index() починається з 1, */
  /* забезпечуючи, що перший елемент стартує одразу (0s). */
  transition: opacity 0.25s ease, translate 0.25s ease;
  transition-delay: calc(0.1s * (sibling-index() - 1));
	
  @starting-style {
    opacity: 0;
    translate: 1em 0;
  }
}`}</CodeBlock>
                    </SubSection>

                    {/* scrollIntoView() container */}
                    <SubSection
                        id="scrollintoview-container"
                        title="scrollIntoView() container"
                        subtitle="Іноді прокрутка лише найближчого ancestor scroller — це все, що вам потрібно."
                    >
                        <div className="flex flex-wrap gap-3 mb-4">
                            <ResourceLink href="https://codepen.io/web-dot-dev/pen/emZrZoQ" icon={Play}>Демо</ResourceLink>
                            <ResourceLink href="https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView#container" icon={Book}>MDN</ResourceLink>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Опція <code>container</code> для <code>Element.scrollIntoView</code> дозволяє виконувати
                            <code>scrollIntoView</code>, прокручуючи лише найближчий ancestor scroll container.
                            Це надзвичайно корисно, якщо у вас є вкладені scroll-контейнери.
                        </p>

                        <CodeBlock language="javascript">{`slideList.addEventListener('click', (evt) => {
  // scrollIntoView автоматично визначить позицію.
  evt.target.targetSlide.scrollIntoView({container: 'nearest', behavior: 'smooth'});
});`}</CodeBlock>
                    </SubSection>

                    {/* Nested View Transition Groups */}
                    <SubSection
                        id="nested-view-transition-groups"
                        title="Nested View Transition Groups"
                        subtitle="Зберігайте 3D та clipping ефекти під час view transition."
                    >
                        <div className="flex flex-wrap gap-3 mb-4">
                            <ResourceLink href="https://codepen.io/web-dot-dev/pen/wBMvxdz" icon={Play}>Демо</ResourceLink>
                            <ResourceLink href="https://developer.chrome.com/docs/css-ui/view-transitions/nested-view-transition-groups" icon={Book}>Chrome for Developers</ResourceLink>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Nested view transition groups — це розширення для view transitions, яке дозволяє вкладати
                            псевдо-елементи <code>::view-transition-group</code> один в одного.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Коли view transition groups вкладені, замість того щоб розміщувати їх усі як сусіди під
                            одним псевдо-елементом <code>::view-transition</code>, можна зберегти 3D та clipping ефекти під час переходу.
                        </p>

                        <CodeBlock language="css">{`.card {
  view-transition-name: card;
  overflow: clip;
}

.card img {
  view-transition-name: photo;
  view-transition-group: nearest;
}

::view-transition-group-children(card) {
  overflow: clip;
}`}</CodeBlock>
                    </SubSection>

                    {/* DOM State-Preserving Move */}
                    <SubSection
                        id="dom-state-preserving-move"
                        title="DOM State-Preserving Move"
                        subtitle="Переміщуйте iframe та відео по DOM без їх перезавантаження."
                    >
                        <div className="flex flex-wrap gap-3 mb-4">
                            <ResourceLink href="https://codepen.io/web-dot-dev/pen/QwNrNPQ" icon={Play}>Демо</ResourceLink>
                            <ResourceLink href="https://www.bram.us/2025/01/16/move-elements-around-the-dom-while-preserving-their-state-with-movebefore/" icon={Book}>Chrome for Developers</ResourceLink>
                            <ResourceLink href="https://developer.mozilla.org/en-US/docs/Web/API/Element/moveBefore" icon={Book}>MDN</ResourceLink>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Використання <code>insertBefore</code> для переміщення елемента в DOM є деструктивним.
                            Якщо ви переміщуєте відео, що програється, або iframe за допомогою <code>insertBefore</code>,
                            він перезавантажується і повністю втрачає свій стан.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Однак, з Chrome 133, ви можете використовувати <code>moveBefore</code>.
                            Він працює точно так само як <code>insertBefore</code>, але зберігає елемент живим під час переміщення.
                        </p>

                        <CodeBlock language="javascript">{`const $newSibling = getRandomElementInBody();
const $iframe = document.querySelector('iframe');
document.body.moveBefore($iframe, $newSibling);`}</CodeBlock>

                        <p className="text-gray-700 dark:text-gray-300">
                            Це означає, що відео продовжують грати, iframe'и не перезавантажуються, CSS-анімації не перезапускаються,
                            а поля введення зберігають фокус — навіть коли ви активно reparent-ите їх по вашому layout.
                        </p>
                    </SubSection>
                </Section>

                {/* Section 3: Optimized Ergonomics */}
                <Section id="optimized-ergonomics" title="🛠️ Оптимізована ергономіка">
                    <p className="text-gray-700 dark:text-gray-300 mb-8">
                        Ці модулі — не просто plug-and-play; вони справжні хамелеони, що дозволяють користувачам
                        перевизначати інтерфейс, функціональність та естетику аж до атомарного рівня.
                    </p>

                    {/* Advanced attr() function */}
                    <SubSection
                        id="advanced-attr-function"
                        title="Розширена функція attr()"
                        subtitle="Типізовані значення для attr() за межами простих рядків."
                    >
                        <div className="flex flex-wrap gap-3 mb-4">
                            <ResourceLink href="https://codepen.io/web-dot-dev/pen/emZRyaZ" icon={Play}>Демо</ResourceLink>
                            <ResourceLink href="https://developer.chrome.com/blog/advanced-attr" icon={Book}>Chrome for Developers</ResourceLink>
                            <ResourceLink href="https://developer.mozilla.org/docs/Web/CSS/attr" icon={Book}>MDN</ResourceLink>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            CSS-функція <code>attr()</code>, яка дозволяє використовувати значення HTML-атрибута
                            у вашому CSS, отримала потужне оновлення.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Раніше <code>attr()</code> можна було використовувати лише в межах властивості content
                            псевдо-елементів і вона могла повертати значення лише як CSS-рядок. Оновлена функція <code>attr()</code>
                            розширює свої можливості, дозволяючи використовувати її з будь-якою CSS-властивістю,
                            включаючи custom properties.
                        </p>

                        <CodeBlock language="css">{`div {
  color: attr(data-color type(<color>), red);
}

.card {
  /* card-1, card-2, card-3, тощо */
  view-transition-name: attr(id type(<custom-ident>), none);
  view-transition-class: card;
}

.star-rating {
  --percent-fill: calc(attr(data-rating type(<number>)) * 20%);
  background: linear-gradient(to right, gold var(--percent-fill), transparent var(--percent-fill));
  
  &::after {
    content: attr(data-rating);
  }
}`}</CodeBlock>
                    </SubSection>

                    {/* ToggleEvent.source */}
                    <SubSection
                        id="toggleevent-source"
                        title="ToggleEvent.source"
                        subtitle="Дізнайтеся, який елемент був відповідальним за toggle цільового елемента."
                    >
                        <div className="flex flex-wrap gap-3 mb-4">
                            <ResourceLink href="https://codepen.io/web-dot-dev/pen/VYaxaNv" icon={Play}>Демо</ResourceLink>
                            <ResourceLink href="https://developer.mozilla.org/docs/Web/API/ToggleEvent/source" icon={Book}>MDN</ResourceLink>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Коли popover, <code>&lt;dialog&gt;</code> або <code>&lt;details&gt;</code> елемент
                            перемикається, може бути цікаво знати, який елемент був відповідальним за це.
                            Наприклад, знати, чи користувач натиснув кнопку "Прийняти cookies" чи "Відхилити cookies"
                            для закриття cookie-банера — це дуже важлива деталь.
                        </p>

                        <CodeBlock language="html">{`<div id="cookiebanner" popover="auto">
  <p>Бажаєте печиво?</p>
  <button id="yes" commandfor="cookiebanner" command="hide-popover">Так</button>
  <button id="no" commandfor="cookiebanner" command="hide-popover">Ні</button>
</div>`}</CodeBlock>

                        <CodeBlock language="javascript">{`$cookiebanner.addEventListener('toggle', event => {
  if (event.source == $btnYes) {
    // Дати користувачу cookie
  } else if (event.source == $btnNo) {
    // Не давати користувачу cookie
  }
});`}</CodeBlock>
                    </SubSection>

                    {/* text-box features */}
                    <SubSection
                        id="text-box-features"
                        title="text-box features"
                        subtitle="Бездоганно центруйте текст вертикально."
                    >
                        <div className="flex flex-wrap gap-3 mb-4">
                            <ResourceLink href="https://codepen.io/web-dot-dev/pen/RNbyooE" icon={Play}>Демо</ResourceLink>
                            <ResourceLink href="https://developer.chrome.com/blog/css-text-box-trim" icon={Book}>Chrome for Developers</ResourceLink>
                            <ResourceLink href="https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box" icon={Book}>MDN</ResourceLink>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Content box шрифту визначається внутрішніми метриками — конкретно ascent та descent,
                            які резервують простір для акцентів та висячих символів.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Оскільки візуальні межі латинського тексту — це cap height та alphabetic baseline,
                            а не ascent та descent, текст виглядатиме оптично зміщеним від центру, навіть коли він
                            математично центрований всередині контейнера.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Властивості <code>text-box</code> роблять можливим тонший контроль вертикального вирівнювання тексту,
                            дозволяючи бездоганно центрувати текст вертикально.
                        </p>

                        <CodeBlock language="css">{`h1, button {
  text-box: trim-both cap alphabetic;
}`}</CodeBlock>
                    </SubSection>

                    {/* shape() function */}
                    <SubSection
                        id="shape-function"
                        title="Функція shape()"
                        subtitle="CSS-функція для складних, адаптивних форм."
                    >
                        <div className="flex flex-wrap gap-3 mb-4">
                            <ResourceLink href="https://codepen.io/web-dot-dev/pen/xbVXOdJ" icon={Play}>Демо</ResourceLink>
                            <ResourceLink href="https://developer.chrome.com/blog/css-shape" icon={Book}>Chrome for Developers</ResourceLink>
                            <ResourceLink href="https://developer.mozilla.org/Web/CSS/basic-shape/shape" icon={Book}>MDN</ResourceLink>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Нова функція <code>shape()</code> дозволяє обрізати елемент до складної, неполігональної,
                            адаптивної форми в CSS. Це чудовий варіант для обрізних масок за допомогою <code>clip-path: path()</code>,
                            і безшовно працює з CSS custom properties для визначення координат та контрольних точок.
                        </p>

                        <CodeBlock language="css">{`.flag {
  clip-path: shape(from 0% 20px,
    curve to 100% 20px with 25% 0% / 75% 40px,
    vline to calc(100% - 20px),
    curve to 0% calc(100% - 20px) 
      with 75% 100% / 25% calc(100% - 40px),
    close
  );
}`}</CodeBlock>
                    </SubSection>

                    {/* if() statements */}
                    <SubSection
                        id="if-statements"
                        title="if() statements"
                        subtitle="Умовні оператори у вашому CSS для динамічної стилізації."
                    >
                        <div className="flex flex-wrap gap-3 mb-4">
                            <ResourceLink href="https://codepen.io/web-dot-dev/pen/KwzXMXW" icon={Play}>Демо</ResourceLink>
                            <ResourceLink href="https://developer.chrome.com/blog/if-article" icon={Book}>Chrome for Developers</ResourceLink>
                            <ResourceLink href="https://developer.mozilla.org/docs/Web/CSS/Reference/Values/if" icon={Book}>MDN</ResourceLink>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Функція <code>if()</code> в CSS дозволяє встановлювати різні значення для властивості
                            на основі умовного тесту. Думайте про неї як про тернарний оператор у JavaScript,
                            але для ваших стилів.
                        </p>

                        <CodeBlock language="css">{`if(condition-1: value-1; condition-2: value-2; else: fallback-value);`}</CodeBlock>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Наразі <code>if()</code> можна використовувати з трьома типами запитів:
                        </p>

                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-1">
                            <li><code>media()</code>: для media queries.</li>
                            <li><code>supports()</code>: для feature queries.</li>
                            <li><code>style()</code>: для style queries.</li>
                        </ul>

                        <CodeBlock language="css">{`.responsive-layout {
  display: flex;
  flex-direction: if(media(orientation: landscape): row; else: column);
}`}</CodeBlock>
                    </SubSection>

                    {/* Custom Functions */}
                    <SubSection
                        id="custom-functions"
                        title="Custom Functions"
                        subtitle="Перевикористовувані функції для чистіших, підтримуваних стилів."
                    >
                        <div className="flex flex-wrap gap-3 mb-4">
                            <ResourceLink href="https://codepen.io/web-dot-dev/pen/ogxGLOr" icon={Play}>Демо</ResourceLink>
                            <ResourceLink href="https://developer.mozilla.org/docs/Web/CSS/Guides/Custom_functions_and_mixins/Using_custom_functions" icon={Book}>MDN</ResourceLink>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            CSS custom functions — це фантастичне нове доповнення до мови CSS, яке значно полегшує
                            написання композиційної, перевикористовуваної та зрозумілої функціональної логіки стилізації.
                        </p>

                        <CodeBlock language="css">{`/* Функція negate повертає від'ємне значення */
@function --negate(--value) {
  result: calc(-1 * var(--value));
} 

/* Використання */
html {
  --gap: 1em;
  padding: --negate(var(--gap));
}`}</CodeBlock>

                        <CodeBlock language="css">{`/* Умовно застосовує радіус, поки ви не в (default: 4px) від краю екрана */
@function --conditional-radius(--radius, --edge-dist: 4px) {
  result: clamp(0px, ((100vw - var(--edge-dist)) - 100%) * 1e5, var(--radius));
}

/* використання */
.box {
  border-radius: --conditional-radius(1rem);
}`}</CodeBlock>
                    </SubSection>

                    {/* Expanded range syntax */}
                    <SubSection
                        id="expanded-range-syntax"
                        title="Expanded range syntax"
                        subtitle="Синтаксис діапазонів у style queries та if() statements."
                    >
                        <div className="flex flex-wrap gap-3 mb-4">
                            <ResourceLink href="https://codepen.io/web-dot-dev/pen/bNpoBbx" icon={Play}>Демо</ResourceLink>
                            <ResourceLink href="https://developer.mozilla.org/docs/Web/CSS/Guides/Containment/Container_size_and_style_queries" icon={Book}>MDN</ResourceLink>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Одне приємне оновлення цього року — можливість використовувати синтаксис діапазонів
                            у style queries та <code>if()</code> statements. Media queries та container queries
                            вже підтримували цю можливість, але раніше style queries вимагали точного збігу значення.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Тепер ви можете типізувати ваші значення та використовувати їх з операторами порівняння
                            як <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code> та <code>&gt;=</code>.
                        </p>

                        <CodeBlock language="css">{`.card-container {
  container-name: weather;
  --rain-percent: attr(data-rain-percent type(<percentage>));
}

@container style(--rain-percent > 45%) {
  .weather-card {
    background: linear-gradient(140deg, blue, lightblue);
  }
}`}</CodeBlock>
                    </SubSection>

                    {/* Stretch sizing keyword */}
                    <SubSection
                        id="stretch-sizing-keyword"
                        title="Stretch sizing keyword"
                        subtitle="Зробіть елемент таким, щоб він заповнював свій containing block, незалежно від box-sizing."
                    >
                        <div className="flex flex-wrap gap-3 mb-4">
                            <ResourceLink href="https://codepen.io/web-dot-dev/pen/qEZYZwW" icon={Play}>Демо</ResourceLink>
                            <ResourceLink href="https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/width#stretch" icon={Book}>MDN</ResourceLink>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Ключове слово <code>stretch</code> — це ключове слово для використання з CSS-властивостями
                            розмірів (такими як <code>width</code> та <code>height</code>), яке дозволяє елементам
                            рости, щоб точно заповнити доступний простір їхнього containing block.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Це схоже на <code>100%</code>, за винятком того, що результуючий розмір застосовується
                            до margin box елемента замість box, визначеного <code>box-sizing</code>.
                        </p>

                        <CodeBlock language="css">{`.element {
  height: stretch;
}`}</CodeBlock>
                    </SubSection>

                    {/* corner-shape */}
                    <SubSection
                        id="corner-shape"
                        title="corner-shape"
                        subtitle="Форми кутів за межами заокруглених країв."
                    >
                        <div className="flex flex-wrap gap-3 mb-4">
                            <ResourceLink href="https://codepen.io/web-dot-dev/pen/OPNzoqW" icon={Play}>Демо</ResourceLink>
                            <ResourceLink href="https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/corner-shape" icon={Book}>MDN</ResourceLink>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Цього року CSS дає нам більше контролю над формою наших елементів з новою властивістю
                            <code>corner-shape</code>. Ця експериментальна функція дозволяє кастомізувати форму кутів
                            за межами стандартних заокруглених кутів, доступних з <code>border-radius</code>.
                        </p>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Тепер ви можете створювати різноманітні стилі кутів:
                        </p>

                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-1">
                            <li><code>round</code> — заокруглений</li>
                            <li><code>bevel</code> — скошений</li>
                            <li><code>notch</code> — виріз</li>
                            <li><code>scoop</code> — зачерпнутий</li>
                            <li><code>squircle</code> — суперекліпс</li>
                        </ul>

                        <CodeBlock language="css">{`.top-left-petal {
  grid-area: 1 / 1 / 3 / 3;
  corner-shape: round round scoop;
  border-radius: 50%;
}`}</CodeBlock>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Для ще більшого контролю ви можете використовувати функцію <code>superellipse()</code>
                            для створення будь-якої неперервної кривої, що дозволяє точно налаштовані та унікальні дизайни кутів.
                        </p>

                        <div className="flex flex-wrap gap-3">
                            <ResourceLink href="https://codepen.io/collection/bGBzdV" icon={Code2}>#CodePenChallenge: CSS Shape</ResourceLink>
                            <ResourceLink href="https://frontendmasters.com/blog/understanding-css-corner-shape-and-the-power-of-the-superellipse/" icon={Book}>Understanding CSS corner-shape</ResourceLink>
                        </div>
                    </SubSection>
                </Section>

                {/* Baseline Updates */}
                <div className="py-12 px-4 bg-gradient-to-r from-lime-50 to-emerald-50 dark:from-lime-950/20 dark:to-emerald-950/20 rounded-xl my-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                        📊 Оновлення Baseline у 2025
                    </h3>
                    <ul className="space-y-3 max-w-2xl mx-auto">
                        <li className="flex items-start gap-2">
                            <span className="text-lime-500">✓</span>
                            <span className="text-gray-700 dark:text-gray-300">Container Queries досягли Baseline Widely available</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-lime-500">✓</span>
                            <span className="text-gray-700 dark:text-gray-300">Interop 2025 приніс великі покращення для CSS anchor positioning</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-lime-500">✓</span>
                            <span className="text-gray-700 dark:text-gray-300">Popover API з'явився у всіх браузерних рушіях</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-lime-500">✓</span>
                            <span className="text-gray-700 dark:text-gray-300">CSS тригонометричні функції стали Baseline widely available</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-lime-500">✓</span>
                            <span className="text-gray-700 dark:text-gray-300">Same-document view transitions стали Baseline Newly available</span>
                        </li>
                    </ul>
                </div>

            </div>

            {/* Footer */}
            <footer className="py-12 px-4 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Оригінальна стаття:{' '}
                        <a
                            href="https://chrome.dev/css-wrapped-2025/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lime-600 dark:text-lime-400 hover:underline"
                        >
                            CSS Wrapped 2025 — chrome.dev
                        </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                        Переклад зроблено для україномовної спільноти розробників.
                        Весь оригінальний контент належить Google/Chrome DevRel команді.
                    </p>
                    <div className="mt-6">
                        <Link to="/" className="text-lime-600 dark:text-lime-400 hover:underline">
                            ← Повернутися на головну
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
