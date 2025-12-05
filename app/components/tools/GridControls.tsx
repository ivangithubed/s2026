import { Columns3, Rows3, ArrowRightLeft, ArrowUpDown } from 'lucide-react';

interface GridControlsProps {
    columns: number;
    rows: number;
    columnGap: number;
    rowGap: number;
    onColumnsChange: (value: number) => void;
    onRowsChange: (value: number) => void;
    onColumnGapChange: (value: number) => void;
    onRowGapChange: (value: number) => void;
    onGetCode: () => void;
}

export function GridControls({
    columns,
    rows,
    columnGap,
    rowGap,
    onColumnsChange,
    onRowsChange,
    onColumnGapChange,
    onRowGapChange,
    onGetCode,
}: GridControlsProps) {
    return (
        <div className="flex flex-col gap-6 xl:gap-8 w-full xl:w-auto">
            <div>
                <h1 className="text-lime-500 dark:text-lime-400 text-xl md:text-2xl xl:text-[40px] font-bold leading-tight mb-4 xl:mb-8">
                    CSS Grid <span className="hidden xl:block"></span>Генератор
                </h1>
            </div>

            <div className="grid grid-cols-2 xl:flex xl:flex-col gap-3 md:gap-4 xl:gap-6">
                <ControlInput
                    label="Колонки"
                    icon={<Columns3 className="w-4 h-4" />}
                    value={columns}
                    onChange={onColumnsChange}
                />

                <ControlInput
                    label="Рядки"
                    icon={<Rows3 className="w-4 h-4" />}
                    value={rows}
                    onChange={onRowsChange}
                />

                <ControlInput
                    label="Відступ"
                    icon={<ArrowRightLeft className="w-4 h-4" />}
                    sublabel="px"
                    value={columnGap}
                    onChange={onColumnGapChange}
                    title="Відступ між колонками"
                />

                <ControlInput
                    label="Відступ"
                    icon={<ArrowUpDown className="w-4 h-4" />}
                    sublabel="px"
                    value={rowGap}
                    onChange={onRowGapChange}
                    title="Відступ між рядками"
                />
            </div>

            <button
                onClick={onGetCode}
                className="mt-2 xl:mt-4 px-6 xl:px-8 py-2.5 xl:py-3 bg-transparent border-2 border-lime-500 dark:border-lime-400 text-lime-600 dark:text-lime-400 rounded-full hover:bg-lime-500 dark:hover:bg-lime-400 hover:text-white dark:hover:text-slate-900 transition-colors w-full xl:w-auto font-medium"
            >
                Отримати код
            </button>
        </div>
    );
}

interface ControlInputProps {
    label: string;
    icon?: React.ReactNode;
    sublabel?: string;
    value: number;
    onChange: (value: number) => void;
    title?: string;
}

function ControlInput({ label, icon, sublabel, value, onChange, title }: ControlInputProps) {
    const maxValue = label === 'Колонки' ? 12 : 20;

    const updateValue = (newValue: number) => {
        onChange(Math.max(0, Math.min(maxValue, newValue)));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            updateValue(value + 1);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            updateValue(value - 1);
        }
    };

    const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
        if (document.activeElement === e.currentTarget) {
            e.preventDefault();
            if (e.deltaY < 0) {
                updateValue(value + 1);
            } else {
                updateValue(value - 1);
            }
        }
    };

    return (
        <div className="flex items-center justify-between xl:justify-start gap-2 xl:gap-4" title={title}>
            <label className="flex items-center gap-1.5 text-gray-900 dark:text-white xl:min-w-[140px] text-sm xl:text-base whitespace-nowrap">
                {icon}
                {label}
                {sublabel && <span className="text-gray-500 dark:text-gray-400 text-xs xl:text-sm">{sublabel}</span>}
            </label>
            <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={value}
                onChange={(e) => {
                    const newValue = parseInt(e.target.value) || 0;
                    updateValue(newValue);
                }}
                onKeyDown={handleKeyDown}
                onWheel={handleWheel}
                title="Скрол або ↑↓ для зміни"
                className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-2 md:px-3 xl:px-4 py-1.5 md:py-2 rounded-lg w-10 md:w-15 xl:w-20 text-center border border-slate-300 dark:border-slate-600 focus:outline-none focus:border-lime-500 dark:focus:border-lime-400 text-sm md:text-base appearance-none"
            />
        </div>
    );
}
