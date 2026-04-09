import { useState } from 'react';
import { Search } from 'lucide-react';
import { operators, type OperatorCategory, type OperatorData } from './data';

interface OperatorSearchProps {
    onSelectOperator: (operator: string) => void;
}

const CATEGORY_ORDER: OperatorCategory[] = [
    'Arithmetic',
    'Comparison',
    'Logical',
    'Bitwise',
    'Shift',
    'Other',
];

const CATEGORY_LABELS: Record<OperatorCategory, string> = {
    Arithmetic: "Арифметичні",
    Comparison: "Порівняння",
    Logical: "Логічні",
    Bitwise: "Побітові",
    Shift: "Зсуву",
    Other: "Інші",
};

export function OperatorSearch({ onSelectOperator }: OperatorSearchProps) {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchValue.trim()) {
            onSelectOperator(searchValue.trim());
        }
    };

    const grouped = CATEGORY_ORDER.map((cat) => ({
        category: cat,
        items: (operators as OperatorData[]).filter((op) => op.category === cat),
    }));

    return (
        <div className="flex flex-col items-center justify-center px-4 sm:px-8 py-12 sm:py-16">
            <div className="w-full max-w-4xl space-y-8 sm:space-y-16">
                {/* Header */}
                <div className="text-center space-y-4 sm:space-y-6">
                    <h1 className="text-3xl sm:text-5xl text-balance text-gray-900 dark:text-white font-bold tracking-tight">Довідник операторів JS</h1>
                    <p id="search-description" className="text-base sm:text-xl text-gray-600 dark:text-slate-400 text-balance">Шукайте за символом (наприклад, + або ===)</p>
                </div>

                {/* Search */}
                <form onSubmit={handleSearch} className="relative group">
                    <Search aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 text-gray-400 group-focus-within:text-lime-500 transition-colors" />
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        aria-labelledby="search-description"
                        className="w-full bg-transparent border-b-2 border-gray-200 dark:border-slate-700 pl-14 sm:pl-16 pr-4 py-3 sm:py-4 text-xl sm:text-2xl focus-visible:outline-none focus:border-lime-500 transition-colors touch-manipulation text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-slate-600"
                        placeholder="Введіть оператор..."
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck={false}
                    />
                </form>

                {/* Operator Grid */}
                <div className="space-y-6 sm:space-y-8">
                    <p className="text-center text-base sm:text-xl text-gray-600 dark:text-slate-400">Або виберіть зі списку:</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
                        {grouped.map(({ category, items }, index) => (
                            <div
                                key={category}
                                className="space-y-3"
                            >
                                <h2 className="text-xs sm:text-sm font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
                                    {CATEGORY_LABELS[category]}
                                </h2>
                                <div className="flex flex-wrap gap-2 sm:gap-3">
                                    {items.map((op: any) => (
                                        <button
                                            key={op.symbol}
                                            onClick={() => onSelectOperator(op.symbol)}
                                            aria-label={op.name}
                                            className="px-4 sm:px-6 py-3 min-h-12 bg-white dark:bg-transparent border border-gray-200 dark:border-slate-800 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 hover:-translate-y-0.5 hover:scale-[1.04] hover:border-lime-500 active:scale-95 active:translate-y-0 shadow-sm hover:shadow-md dark:shadow-none transition-all min-w-[70px] text-base sm:text-lg text-gray-700 dark:text-slate-300 hover:text-lime-600 dark:hover:text-white touch-manipulation focus-visible:outline-2 focus-visible:outline-lime-400 focus-visible:outline-offset-2"
                                        >
                                            {op.symbol}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}