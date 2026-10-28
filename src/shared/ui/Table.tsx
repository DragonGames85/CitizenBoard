import { columnSizingFeature, tableFeatures, useTable, type ColumnDef } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

export const tableFeaturesSet = tableFeatures({ columnSizingFeature });

type RowData = { id?: string };

type Props<T extends RowData> = {
    data: T[];
    columns: ReadonlyArray<ColumnDef<typeof tableFeaturesSet, T>>;
    onRowClick?: (row: T) => void;
};

export function Table<T extends RowData>({ data, columns, onRowClick }: Props<T>) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const table = useTable({ features: tableFeaturesSet, columns, data });
    const rows = table.getRowModel().rows;

    const virtualizer = useVirtualizer({
        count: rows.length,
        getScrollElement: () => scrollRef.current,
        estimateSize: () => 48,
        overscan: 12,
        getItemKey: index => rows[index]?.id ?? index,
    });

    const headerGroup = table.getHeaderGroups()[0];
    const totalWidth = headerGroup?.headers.reduce((sum, header) => sum + header.getSize(), 0) ?? 900;

    return (
        <div ref={scrollRef} className="border-line h-[min(70vh,720px)] overflow-auto rounded-md border">
            <div style={{ minWidth: totalWidth }}>
                <div className="border-line bg-panel-2/95 sticky top-0 z-10 flex border-b backdrop-blur">
                    {headerGroup?.headers.map(header => (
                        <div
                            key={header.id}
                            className="text-secondary shrink-0 px-3 py-3 text-xs font-medium tracking-wide uppercase"
                            style={{ width: header.getSize() }}
                        >
                            {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                        </div>
                    ))}
                </div>

                <div className="relative" style={{ height: virtualizer.getTotalSize() }}>
                    {virtualizer.getVirtualItems().map(item => {
                        const row = rows[item.index]!;
                        const open = onRowClick ? () => onRowClick(row.original) : undefined;
                        return (
                            <div
                                key={row.id}
                                role={open ? 'link' : undefined}
                                tabIndex={open ? 0 : undefined}
                                onClick={open}
                                onKeyDown={event => {
                                    if (event.key === 'Enter') open?.();
                                }}
                                className="border-line/70 hover:bg-neon/5 absolute left-0 flex w-full border-b"
                                style={{
                                    height: item.size,
                                    transform: `translateY(${item.start}px)`,
                                    cursor: open ? 'pointer' : undefined,
                                }}
                            >
                                {row.getAllCells().map(cell => (
                                    <div
                                        key={cell.id}
                                        className="text-ink flex shrink-0 items-center overflow-hidden px-3 text-sm"
                                        style={{ width: cell.column.getSize() }}
                                    >
                                        <table.FlexRender cell={cell} />
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
