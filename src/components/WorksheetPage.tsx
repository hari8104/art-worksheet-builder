import { Instagram } from 'lucide-react';
import type { WorksheetConfig, PageConfig, BoxConfig } from '../types';
import PracticeBox from './PracticeBox';

interface WorksheetPageProps {
  config: WorksheetConfig;
  page: PageConfig;
  pageIndex: number;
  showHeader: boolean;
  onUpdateBox: (boxIndex: number, updates: Partial<BoxConfig>) => void;
}

export default function WorksheetPage({
  config,
  page,
  pageIndex,
  showHeader,
  onUpdateBox,
}: WorksheetPageProps) {
  return (
    <div
      className="worksheet-page bg-white shadow-lg"
      style={{
        width: '210mm',
        height: '297mm',
        padding: '12mm',
        boxSizing: 'border-box',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      {showHeader && (
        <header className="mb-3 flex-shrink-0">
          <div className="flex items-start gap-3 mb-2">
            <div className="flex-shrink-0">
              {config.logoUrl ? (
                <img src={config.logoUrl} alt="Logo" className="w-16 h-16 object-contain" />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center">
                  <span className="text-white text-xs font-bold text-center leading-tight px-1">ART</span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-base font-extrabold text-slate-900 tracking-wide leading-tight">
                {config.schoolName}
              </h2>
              <p className="text-xs text-slate-500 italic mt-0.5">{config.tagline}</p>
              {config.socialHandle && (
                <div className="flex items-center gap-1 mt-1">
                  <Instagram size={11} className="text-slate-400" />
                  <span className="text-xs text-slate-500">{config.socialHandle}</span>
                </div>
              )}
            </div>
          </div>

          <div className="border-t-2 border-slate-900 mb-2" />
          <h1 className="text-xl font-bold text-slate-800 mb-2">{config.title}</h1>
          <div className="border-t border-slate-300 mb-3" />

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2 flex-1">
              <span className="font-semibold text-slate-700 uppercase tracking-wide">Name:</span>
              <div className="flex-1 border-b border-dashed border-slate-400 min-w-[120px]" />
            </div>
            <div className="px-4 py-1 border-2 border-slate-800 font-bold text-slate-800 text-xs whitespace-nowrap">
              {config.studentClass}
            </div>
            <div className="flex items-center gap-2 flex-1 justify-end">
              <span className="font-semibold text-slate-700 uppercase tracking-wide">Date:</span>
              <div className="border-b border-dashed border-slate-400 min-w-[100px]" />
            </div>
          </div>
        </header>
      )}

      {!showHeader && (
        <div className="text-right text-xs text-slate-400 mb-3 flex-shrink-0">
          Page {pageIndex + 1}
        </div>
      )}

      {/* Grid — stretches to fill remaining page height */}
      <div
        style={{
          position: 'relative',
          flex: 1,
          display: 'grid',
          gridTemplateColumns: `repeat(${page.cols}, 1fr)`,
          gridTemplateRows: `repeat(${page.rows}, 1fr)`,
          minHeight: 0,
        }}
      >
        {page.boxes.map((box, boxIndex) => (
          <PracticeBox
            key={box.id}
            box={box}
            index={boxIndex}
            onUpdate={(updates) => onUpdateBox(boxIndex, updates)}
          />
        ))}

        {/* Watermark overlay - appears on top of boxes */}
        {config.showWatermark && config.watermarkUrl && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center" style={{ zIndex: 10 }}>
            <img
              src={config.watermarkUrl}
              alt="Watermark"
              style={{ opacity: config.watermarkOpacity, maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }}
            />
          </div>
        )}

        {config.showWatermark && !config.watermarkUrl && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center" style={{ zIndex: 10 }}>
            <span
              className="text-slate-400 font-extrabold text-6xl tracking-widest select-none"
              style={{ transform: 'rotate(-30deg)', opacity: config.watermarkOpacity * 5 }}
            >
              {config.schoolName.split(' ')[0]}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
