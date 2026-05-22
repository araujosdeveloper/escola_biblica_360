import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { TableSkeleton } from '@/components/LoadingSkeletons.jsx';

export default function DataTable({
  columns = [],
  data = [],
  loading = false,
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Buscar...',
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-admin-border bg-white shadow-sm">
      {onSearchChange && (
        <div className="border-b border-admin-border p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={searchPlaceholder}
              className="pl-10"
            />
          </div>
        </div>
      )}

      {loading ? (
        <TableSkeleton rows={5} columns={columns.length || 4} />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-500">
              <tr>
                {columns.map((column) => (
                  <th key={column.accessorKey} className="px-5 py-4">
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-admin-border">
              {data.length > 0 ? (
                data.map((row) => (
                  <tr key={row.id} className="transition-colors hover:bg-gray-50/70">
                    {columns.map((column) => (
                      <td key={column.accessorKey} className="px-5 py-4 align-middle">
                        {column.cell ? column.cell(row) : row[column.accessorKey]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-5 py-12 text-center text-gray-500">
                    Nenhum registro encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}