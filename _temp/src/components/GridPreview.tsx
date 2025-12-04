import React from 'react';

interface GridPreviewProps {
  columns: number;
  rows: number;
  columnGap: number;
  rowGap: number;
  columnSizes: string[];
  rowSizes: string[];
  onColumnSizeClick: (index: number) => void;
  onRowSizeClick: (index: number) => void;
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
              onClick={() => onColumnSizeClick(index)}
              className="px-3 md:px-4 lg:px-6 py-1.5 md:py-2 bg-[#3a3a3a] text-white rounded-lg hover:bg-[#4a4a4a] transition-colors min-w-[50px] md:min-w-[60px] lg:min-w-[80px] text-xs md:text-sm lg:text-base flex-shrink-0"
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
                onClick={() => onRowSizeClick(index)}
                className="px-3 md:px-4 lg:px-6 py-1.5 md:py-2 bg-[#3a3a3a] text-white rounded-lg hover:bg-[#4a4a4a] transition-colors min-w-[50px] md:min-w-[60px] lg:min-w-[80px] text-xs md:text-sm lg:text-base flex-shrink-0"
              >
                {size}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div 
            className="border-2 md:border-4 border-[#d4ff00] bg-black p-2 md:p-3 lg:p-4 flex-1 overflow-auto"
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
                className="bg-[#1a1a1a] border border-gray-700 min-h-[40px] md:min-h-[50px] lg:min-h-[60px]"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}