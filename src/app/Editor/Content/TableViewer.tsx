// CodeEditor component remains the same as before

import { TableData } from "@/app/types";

// TableViewer component
export const TableViewer: React.FC<{ data: TableData }> = ({ data }) => {
    return (
      <div className="overflow-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="border-b border-gray-700">
              {data.headers.map((header, index) => (
                <th key={index} className="px-5 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-700 bg-transparent">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-5 py-2 border-b border-gray-700 text-sm">
                    <div className="text-gray-400 whitespace-no-wrap">{cell}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  