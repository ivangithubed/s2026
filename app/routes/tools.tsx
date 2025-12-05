import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Grid3X3, ArrowRight, Code2, ExternalLink } from 'lucide-react';

interface Tool {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    path: string;
    color: string;
    isExternal?: boolean;
}

const tools: Tool[] = [
    {
        id: 'grid-generator',
        title: 'CSS Grid Generator',
        description: 'Візуальний генератор CSS Grid. Налаштуйте колонки, рядки, gap та отримайте готовий код.',
        icon: <Grid3X3 className="w-8 h-8" />,
        path: '/tools/grid-generator',
        color: 'lime',
    },
    {
        id: 'html-day',
        title: 'HTML Day',
        description: 'Безкоштовний застосунок для вивчення HTML-елементів. Щодня новий тег, атрибути, вікторина та MDN-документація.',
        icon: <Code2 className="w-8 h-8" />,
        path: 'https://html-day-eight.vercel.app/',
        color: 'blue',
        isExternal: true,
    },
];

function ToolCard({ tool }: { tool: Tool }) {
    const CardWrapper = tool.isExternal ? 'a' : Link;
    const cardProps = tool.isExternal
        ? { href: tool.path, target: '_blank', rel: 'noopener noreferrer' }
        : { to: tool.path };

    const iconBgColor = tool.color === 'blue'
        ? 'bg-blue-100 dark:bg-blue-900/30'
        : 'bg-lime-100 dark:bg-lime-900/30';

    const iconTextColor = tool.color === 'blue'
        ? 'text-blue-600 dark:text-blue-400'
        : 'text-lime-600 dark:text-lime-400';

    return (
        <CardWrapper
            {...cardProps as any}
            className="group block bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 hover:border-lime-400 dark:hover:border-lime-500 transition-all hover:shadow-lg"
        >
            <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl ${iconBgColor} flex items-center justify-center ${iconTextColor} group-hover:scale-110 transition-transform`}>
                    {tool.icon}
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors flex items-center gap-2">
                        {tool.title}
                        {tool.isExternal && <ExternalLink className="w-4 h-4 text-gray-400" />}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {tool.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-lime-600 dark:text-lime-400 font-medium text-sm group-hover:gap-2.5 transition-all">
                        {tool.isExternal ? 'Перейти' : 'Відкрити'}
                        <ArrowRight className="w-4 h-4" />
                    </span>
                </div>
            </div>
        </CardWrapper>
    );
}

export default function ToolsPage() {
    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Інструменти
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Корисні онлайн-інструменти для веб-розробників. Генератори, конвертери та інші помічники.
                </p>
            </motion.div>

            {/* Tools Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {tools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                ))}
            </motion.div>

            {/* Coming soon */}
            {tools.length < 2 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center mt-12 py-8 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl"
                >
                    <p className="text-gray-500 dark:text-gray-400">
                        🚧 Більше інструментів з'явиться найближчим часом...
                    </p>
                </motion.div>
            )}
        </div>
    );
}
