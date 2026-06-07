import { Printer, Plus, Trash2, FileText, ChevronRight } from 'lucide-react';
import type { WorksheetConfig } from '../types';

interface ToolbarProps {
  config: WorksheetConfig;
  activePage: number;
  pageCount: number;
  onAddPage: () => void;
  onSelectPage: (index: number) => void;
  onRemovePage: (index: number) => void;
}

export default function Toolbar({
  config,
  activePage,
  pageCount,
  onAddPage,
  onSelectPage,
  onRemovePage,
}: ToolbarProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="bg-white border-b border-slate-200 px-2 md:px-4 py-1.5 md:py-3 flex items-center justify-between shadow-sm no-print flex-wrap gap-1.5 md:gap-2 lg:gap-0">
      <div className="flex items-center gap-1.5 md:gap-3 min-w-0">
        <div className="flex items-center gap-1 md:gap-2 min-w-0">
          <div className="w-6 md:w-8 h-6 md:h-8 bg-rose-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText size={14} className="text-white md:w-4 md:h-4" />
          </div>
          <div className="hidden md:block min-w-0">
            <h1 className="text-xs md:text-sm font-bold text-slate-800 leading-none truncate">Art Worksheet Studio</h1>
            <p className="text-xs text-slate-400 mt-0.5 truncate">Worksheet Builder</p>
          </div>
          <h1 className="text-xs md:hidden font-bold text-slate-800">Sheet</h1>
        </div>

        <div className="w-px h-5 md:h-8 bg-slate-200 mx-1 hidden md:block" />

        <div className="flex items-center gap-0.5 md:gap-1 overflow-x-auto flex-1 md:flex-none">
          {Array.from({ length: pageCount }, (_, i) => (
            <div key={i} className="flex items-center gap-0.5 md:gap-1 flex-shrink-0">
              <button
                onClick={() => onSelectPage(i)}
                className={`flex items-center gap-0.5 md:gap-1 px-1.5 md:px-3 py-1 md:py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                  activePage === i
                    ? 'bg-rose-50 text-rose-600 border border-rose-200'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                }`}
              >
                <span className="md:hidden">P{i + 1}</span>
                <span className="hidden md:inline">Page {i + 1}</span>
                {pageCount > 1 && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemovePage(i);
                    }}
                    className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer flex-shrink-0"
                  >
                    <Trash2 size={12} />
                  </span>
                )}
              </button>
              {i < pageCount - 1 && <ChevronRight size={10} className="text-slate-300 hidden md:block" />}
            </div>
          ))}

          <button
            onClick={onAddPage}
            className="flex items-center gap-0.5 md:gap-1 px-1.5 md:px-3 py-1 md:py-1.5 rounded-md text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-700 border border-dashed border-slate-300 transition-all ml-0.5 md:ml-1 flex-shrink-0"
          >
            <Plus size={12} />
            <span className="hidden md:inline">Add</span>
          </button>
        </div>
      </div>

      <button
        onClick={handlePrint}
        className="flex items-center gap-1 md:gap-2 px-1.5 md:px-4 py-1 md:py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-xs md:text-sm font-medium transition-all shadow-sm hover:shadow-md flex-shrink-0"
      >
        <Printer size={14} className="md:w-4 md:h-4" />
        <span className="hidden md:inline">Print</span>
      </button>
    </header>
  );
}
