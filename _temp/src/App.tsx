import React, { useState } from 'react';
import { GridControls } from './components/GridControls';
import { GridPreview } from './components/GridPreview';
import { CodePanel } from './components/CodePanel';

export default function App() {
  const [columns, setColumns] = useState(5);
  const [rows, setRows] = useState(5);
  const [columnGap, setColumnGap] = useState(0);
  const [rowGap, setRowGap] = useState(0);
  const [columnSizes, setColumnSizes] = useState<string[]>(Array(5).fill('1fr'));
  const [rowSizes, setRowSizes] = useState<string[]>(Array(5).fill('1fr'));
  const [showCodeModal, setShowCodeModal] = useState(false);

  const handleColumnsChange = (value: number) => {
    setColumns(value);
    if (value > columnSizes.length) {
      setColumnSizes([...columnSizes, ...Array(value - columnSizes.length).fill('1fr')]);
    } else {
      setColumnSizes(columnSizes.slice(0, value));
    }
  };

  const handleRowsChange = (value: number) => {
    setRows(value);
    if (value > rowSizes.length) {
      setRowSizes([...rowSizes, ...Array(value - rowSizes.length).fill('1fr')]);
    } else {
      setRowSizes(rowSizes.slice(0, value));
    }
  };

  const updateColumnSize = (index: number) => {
    const newSizes = [...columnSizes];
    const currentValue = parseInt(newSizes[index]) || 1;
    const nextValue = currentValue >= 4 ? 1 : currentValue + 1;
    newSizes[index] = `${nextValue}fr`;
    setColumnSizes(newSizes);
  };

  const updateRowSize = (index: number) => {
    const newSizes = [...rowSizes];
    const currentValue = parseInt(newSizes[index]) || 1;
    const nextValue = currentValue >= 4 ? 1 : currentValue + 1;
    newSizes[index] = `${nextValue}fr`;
    setRowSizes(newSizes);
  };

  const generateCSS = () => {
    return `.parent {
  display: grid;
  grid-template-columns: ${columnSizes.join(' ')};
  grid-template-rows: ${rowSizes.join(' ')};
  grid-column-gap: ${columnGap}px;
  grid-row-gap: ${rowGap}px;
}`;
  };

  const generateHTML = () => {
    return `<div class="parent">
</div>`;
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-4 md:p-6 lg:p-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <GridControls
            columns={columns}
            rows={rows}
            columnGap={columnGap}
            rowGap={rowGap}
            onColumnsChange={handleColumnsChange}
            onRowsChange={handleRowsChange}
            onColumnGapChange={setColumnGap}
            onRowGapChange={setRowGap}
            onGetCode={() => setShowCodeModal(true)}
          />
          
          <GridPreview
            columns={columns}
            rows={rows}
            columnGap={columnGap}
            rowGap={rowGap}
            columnSizes={columnSizes}
            rowSizes={rowSizes}
            onColumnSizeClick={updateColumnSize}
            onRowSizeClick={updateRowSize}
          />
        </div>
      </div>

      <CodePanel
        isOpen={showCodeModal}
        cssCode={generateCSS()}
        htmlCode={generateHTML()}
        onClose={() => setShowCodeModal(false)}
      />
    </div>
  );
}