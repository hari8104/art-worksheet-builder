import type { WorksheetConfig, BoxConfig } from '../types';
import WorksheetPage from './WorksheetPage';

interface WorksheetPreviewProps {
  config: WorksheetConfig;
  activePage: number;
  onUpdateBox: (boxIndex: number, updates: Partial<BoxConfig>) => void;
}

export default function WorksheetPreview({ config, activePage, onUpdateBox }: WorksheetPreviewProps) {
  return (
    <main className="flex-1 overflow-auto bg-slate-300 p-8 no-print-container">
      {/* Screen view: show only active page */}
      <div className="no-print flex justify-center">
        <div className="transform-gpu">
          <WorksheetPage
            config={config}
            page={config.pages[activePage]}
            pageIndex={activePage}
            showHeader={true}
            onUpdateBox={onUpdateBox}
          />
        </div>
      </div>

      {/* Print view: render all pages */}
      <div className="print-only">
        {config.pages.map((page, i) => (
          <WorksheetPage
            key={page.id}
            config={config}
            page={page}
            pageIndex={i}
            showHeader={true}
            onUpdateBox={() => {}}
          />
        ))}
      </div>
    </main>
  );
}
