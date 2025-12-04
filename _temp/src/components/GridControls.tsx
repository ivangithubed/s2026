import React from 'react';

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
        <h1 className="text-[#d4ff00] text-[28px] md:text-[32px] lg:text-[40px] leading-tight mb-4 lg:mb-8">
          CSS Grid<br />Generator
        </h1>
      </div>

      <div className="grid grid-cols-2 lg:flex lg:flex-col gap-3 md:gap-4 lg:gap-6">
        <ControlInput
          label="Columns"
          value={columns}
          onChange={onColumnsChange}
        />

        <ControlInput
          label="Rows"
          value={rows}
          onChange={onRowsChange}
        />

        <ControlInput
          label="Column Gap"
          sublabel="(in px)"
          value={columnGap}
          onChange={onColumnGapChange}
        />

        <ControlInput
          label="Row Gap"
          sublabel="(in px)"
          value={rowGap}
          onChange={onRowGapChange}
        />
      </div>

      <button
        onClick={onGetCode}
        className="mt-2 lg:mt-4 px-6 lg:px-8 py-2.5 lg:py-3 bg-transparent border-2 border-[#d4ff00] text-[#d4ff00] rounded-full hover:bg-[#d4ff00] hover:text-black transition-colors w-full lg:w-auto"
      >
        Get Code
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || 0;
    const maxValue = label === 'Columns' ? 12 : 20;
    onChange(Math.max(0, Math.min(maxValue, newValue)));
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-1.5 lg:gap-4">
      <label className="text-white lg:min-w-[120px] text-xs md:text-sm lg:text-base">
        {label}
        {sublabel && <span className="text-gray-500 ml-1 text-xs lg:text-sm">{sublabel}</span>}
      </label>
      <input
        type="number"
        min="0"
        max={label === 'Columns' ? 12 : 20}
        value={value}
        onChange={handleChange}
        className="bg-black text-white px-3 lg:px-4 py-2 rounded-lg w-full lg:w-20 text-center border border-gray-700 focus:outline-none focus:border-[#d4ff00] text-sm lg:text-base"
      />
    </div>
  );
}