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
        <div className="flex flex-col gap-6 lg:gap-8 w-full lg:w-auto">
            <div>
                <h1 className="text-lime-500 dark:text-lime-400 text-[28px] md:text-[32px] lg:text-[40px] font-bold leading-tight mb-4 lg:mb-8">
                    CSS Grid<br />Генератор
                </h1>
            </div>

            <div className="grid grid-cols-2 lg:flex lg:flex-col gap-3 md:gap-4 lg:gap-6">
                <ControlInput
                    label="Колонки"
                    value={columns}
                    onChange={onColumnsChange}
                />

                <ControlInput
                    label="Рядки"
                    value={rows}
                    onChange={onRowsChange}
                />

                <ControlInput
                    label="Відступ колонок"
                    sublabel="(px)"
                    value={columnGap}
                    onChange={onColumnGapChange}
                />

                <ControlInput
                    label="Відступ рядків"
                    sublabel="(px)"
                    value={rowGap}
                    onChange={onRowGapChange}
                />
            </div>

            <button
                onClick={onGetCode}
                className="mt-2 lg:mt-4 px-6 lg:px-8 py-2.5 lg:py-3 bg-transparent border-2 border-lime-500 dark:border-lime-400 text-lime-600 dark:text-lime-400 rounded-full hover:bg-lime-500 dark:hover:bg-lime-400 hover:text-white dark:hover:text-slate-900 transition-colors w-full lg:w-auto font-medium"
            >
                Отримати код
            </button>
        </div>
    );
}

interface ControlInputProps {
    label: string;
    sublabel?: string;
    value: number;
    onChange: (value: number) => void;
}

function ControlInput({ label, sublabel, value, onChange }: ControlInputProps) {
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
        <div className="flex items-center justify-between lg:justify-start gap-4">
            <label className="text-gray-900 dark:text-white lg:min-w-[140px] text-sm lg:text-base whitespace-nowrap">
                {label}
                {sublabel && <span className="text-gray-500 dark:text-gray-400 ml-1 text-xs lg:text-sm">{sublabel}</span>}
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
                className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white px-4 py-2 rounded-lg w-20 text-center border border-slate-300 dark:border-slate-600 focus:outline-none focus:border-lime-500 dark:focus:border-lime-400 text-base appearance-none"
            />
        </div>
    );
}
