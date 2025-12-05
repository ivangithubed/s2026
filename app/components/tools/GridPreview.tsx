interface GridPreviewProps {
    columns: number;
    rows: number;
    columnGap: number;
    rowGap: number;
    columnSizes: string[];
    rowSizes: string[];
    onColumnSizeClick: (index: number, isRightClick: boolean) => void;
    onRowSizeClick: (index: number, isRightClick: boolean) => void;
}

export function GridPreview({
    columns,
    rows,
    columnGap,
    rowGap,
    columnSizes,
    rowSizes,
    onColumnSizeClick,
    onRowSizeClick,
}: GridPreviewProps) {
    const gridTemplateColumns = columnSizes.slice(0, columns).join(' ');
    const gridTemplateRows = rowSizes.slice(0, rows).join(' ');

    return (
        <div className="flex-1 w-full overflow-x-auto">
            <div className="flex flex-col gap-2 md:gap-4 min-w-[320px]">
                {/* Column size buttons */}
                <div className="flex gap-1.5 md:gap-2 lg:gap-4 pl-8 md:pl-10 lg:pl-12 overflow-x-auto pb-2">
                    {columnSizes.slice(0, columns).map((size, index) => (
                        <button
                            key={index}
                            onClick={() => onColumnSizeClick(index, false)}
                            onContextMenu={(e) => {
                                e.preventDefault();
                                onColumnSizeClick(index, true);
                            }}
                            title="ЛКМ: +1fr | ПКМ: -1fr"
                            className="px-1 md:px-1.5 lg:px-2 py-1 md:py-1.5 bg-slate-200 dark:bg-slate-700 text-gray-900 dark:text-white rounded hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors min-w-8 md:min-w-10 lg:min-w-12 text-xs md:text-sm shrink-0"
                        >
                            {size}
                        </button>
                    ))}
                </div>

                {/* Grid container with row size buttons */}
                <div className="flex gap-1.5 md:gap-2 lg:gap-4">
                    {/* Row size buttons */}
                    <div className="flex flex-col gap-1.5 md:gap-2 lg:gap-4 overflow-y-auto max-h-[500px] md:max-h-[600px]">
                        {rowSizes.slice(0, rows).map((size, index) => (
                            <button
                                key={index}
                                onClick={() => onRowSizeClick(index, false)}
                                onContextMenu={(e) => {
                                    e.preventDefault();
                                    onRowSizeClick(index, true);
                                }}
                                title="ЛКМ: +1fr | ПКМ: -1fr"
                                className="px-1 md:px-1.5 lg:px-2 py-1 md:py-1.5 bg-slate-200 dark:bg-slate-700 text-gray-900 dark:text-white rounded hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors min-w-8 md:min-w-10 lg:min-w-12 text-xs md:text-sm shrink-0"
                            >
                                {size}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div
                        className="border-2 md:border-4 border-lime-500 dark:border-lime-400 bg-white dark:bg-slate-900 p-2 md:p-3 lg:p-4 flex-1 overflow-auto rounded-lg"
                        style={{
                            display: 'grid',
                            gridTemplateColumns,
                            gridTemplateRows,
                            gap: `${rowGap}px ${columnGap}px`,
                            minHeight: '300px',
                            maxHeight: '500px',
                        }}
                    >
                        {Array.from({ length: columns * rows }).map((_, index) => (
                            <div
                                key={index}
                                className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 min-h-10 md:min-h-12 lg:min-h-15 rounded"
                                style={{
                                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.03) 10px, rgba(0,0,0,0.03) 20px)',
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
