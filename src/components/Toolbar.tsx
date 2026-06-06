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
    <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm no-print">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center">
            <FileText size={16} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-800 leading-none">Art Worksheet Studio</h1>
            <p className="text-xs text-slate-400 mt-0.5">Worksheet Builder</p>
          </div>
        </div>

        <div className="w-px h-8 bg-slate-200 mx-1" />

        <div className="flex items-center gap-1">
          {Array.from({ length: pageCount }, (_, i) => (
            <div key={i} className="flex items-center gap-1">
              <button
                onClick={() => onSelectPage(i)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  activePage === i
                    ? 'bg-rose-50 text-rose-600 border border-rose-200'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                }`}
              >
                Page {i + 1}
                {pageCount > 1 && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemovePage(i);
                    }}
                    className="ml-1 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <Trash2 size={10} />
                  </span>
                )}
              </button>
              {i < pageCount - 1 && <ChevronRight size={12} className="text-slate-300" />}
            </div>
          ))}

          <button
            onClick={onAddPage}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-700 border border-dashed border-slate-300 transition-all ml-1"
          >
            <Plus size={12} />
            Add Page
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md"
        >
          <Printer size={15} />
          Print Worksheet
        </button>
      </div>
    </header>
  );
}
