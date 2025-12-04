import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Grid3X3, ArrowRight } from 'lucide-react';

interface Tool {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    path: string;
    color: string;
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
];

function ToolCard({ tool }: { tool: Tool }) {
    return (
        <Link
            to={tool.path}
            className="group block bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 hover:border-lime-400 dark:hover:border-lime-500 transition-all hover:shadow-lg"
        >
            <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-lime-100 dark:bg-lime-900/30 flex items-center justify-center text-lime-600 dark:text-lime-400 group-hover:scale-110 transition-transform">
                    {tool.icon}
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">
                        {tool.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {tool.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-lime-600 dark:text-lime-400 font-medium text-sm group-hover:gap-2.5 transition-all">
                        Відкрити
                        <ArrowRight className="w-4 h-4" />
                    </span>
                </div>
            </div>
        </Link>
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
