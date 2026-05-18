
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function DataTable({ columns, data, searchPlaceholder, searchValue, onSearchChange, loading }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-admin-border overflow-hidden">
      {onSearchChange && (
        <div className="p-4 border-b border-admin-border flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder={searchPlaceholder || "Buscar..."}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 focus-visible:ring-2 focus-visible:ring-admin-gold focus-visible:border-transparent outline-none transition-all bg-gray-50"
            />
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th key={i} className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold tracking-wider px-6 py-3 text-left border-b border-admin-border">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="p-8 text-center text-gray-500">
                  Carregando dados...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="p-8 text-center text-gray-500">
                  Nenhum registro encontrado.
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr key={row.id || rowIndex} className="border-b border-admin-border hover:bg-gray-50 transition-colors">
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 text-sm text-gray-700">
                      {col.cell ? col.cell(row) : row[col.accessorKey]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
