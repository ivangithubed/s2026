import { useState } from 'react';
import { GridControls } from '~/components/tools/GridControls';
import { GridPreview } from '~/components/tools/GridPreview';
import { CodePanel } from '~/components/tools/CodePanel';

export default function GridGeneratorPage() {
    const [columns, setColumns] = useState(3);
    const [rows, setRows] = useState(2);
    const [columnGap, setColumnGap] = useState(0);
    const [rowGap, setRowGap] = useState(0);
    const [columnSizes, setColumnSizes] = useState<string[]>(Array(3).fill('1fr'));
    const [rowSizes, setRowSizes] = useState<string[]>(Array(2).fill('1fr'));
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

    const updateColumnSize = (index: number, isRightClick: boolean) => {
        const newSizes = [...columnSizes];
        const currentValue = parseInt(newSizes[index]) || 1;
        let nextValue: number;
        if (isRightClick) {
            // ПКМ: -1fr, але не менше 1
            if (currentValue <= 1) return;
            nextValue = currentValue - 1;
        } else {
            // ЛКМ: +1fr, цикл на 4
            nextValue = currentValue >= 4 ? 1 : currentValue + 1;
        }
        newSizes[index] = `${nextValue}fr`;
        setColumnSizes(newSizes);
    };

    const updateRowSize = (index: number, isRightClick: boolean) => {
        const newSizes = [...rowSizes];
        const currentValue = parseInt(newSizes[index]) || 1;
        let nextValue: number;
        if (isRightClick) {
            // ПКМ: -1fr, але не менше 1
            if (currentValue <= 1) return;
            nextValue = currentValue - 1;
        } else {
            // ЛКМ: +1fr, цикл на 4
            nextValue = currentValue >= 4 ? 1 : currentValue + 1;
        }
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
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col xl:flex-row gap-6 xl:gap-8">
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

            <CodePanel
                isOpen={showCodeModal}
                cssCode={generateCSS()}
                htmlCode={generateHTML()}
                onClose={() => setShowCodeModal(false)}
            />
        </div>
    );
}
