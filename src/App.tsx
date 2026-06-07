import { useState, useCallback } from 'react';
import type { WorksheetConfig, PageConfig, BoxConfig } from './types';
import ConfigPanel from './components/ConfigPanel';
import WorksheetPreview from './components/WorksheetPreview';
import Toolbar from './components/Toolbar';

function generateId() {
  return Math.random().toString(36).slice(2, 11);
}

function createDefaultBoxes(rows: number, cols: number): BoxConfig[] {
  const count = rows * cols;
  return Array.from({ length: count }, () => ({
    id: generateId(),
    imageUrl: null,
    label: '',
  }));
}

function createDefaultPage(): PageConfig {
  return {
    id: generateId(),
    rows: 4,
    cols: 5,
    boxWidth: 120,
    boxHeight: 120,
    alignment: 'center',
    boxes: createDefaultBoxes(4, 5),
  };
}

const defaultConfig: WorksheetConfig = {
  title: 'Warm up Worksheet',
  schoolName: 'ARTOPUS INDIA-DRAWING CLASSES',
  tagline: '"Creativity in Action"',
  socialHandle: 'artopus_india',
  logoUrl: null,
  watermarkUrl: null,
  showWatermark: true,
  watermarkOpacity: 0.08,
  studentClass: 'BUDS | BLOOSM',
  pages: [createDefaultPage()],
};

export default function App() {
  const [config, setConfig] = useState<WorksheetConfig>(defaultConfig);
  const [activePage, setActivePage] = useState(0);

  const updateConfig = useCallback((updates: Partial<WorksheetConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const updatePage = useCallback((pageIndex: number, updates: Partial<PageConfig>) => {
    setConfig(prev => {
      const pages = [...prev.pages];
      const page = { ...pages[pageIndex], ...updates };

      if ('rows' in updates || 'cols' in updates) {
        const rows = updates.rows ?? pages[pageIndex].rows;
        const cols = updates.cols ?? pages[pageIndex].cols;
        const newCount = rows * cols;
        const existing = page.boxes;
        if (newCount > existing.length) {
          page.boxes = [
            ...existing,
            ...Array.from({ length: newCount - existing.length }, () => ({
              id: generateId(),
              imageUrl: null,
              label: '',
            })),
          ];
        } else {
          page.boxes = existing.slice(0, newCount);
        }
      }

      pages[pageIndex] = page;
      return { ...prev, pages };
    });
  }, []);

  const updateBox = useCallback((pageIndex: number, boxIndex: number, updates: Partial<BoxConfig>) => {
    setConfig(prev => {
      const pages = [...prev.pages];
      const boxes = [...pages[pageIndex].boxes];
      boxes[boxIndex] = { ...boxes[boxIndex], ...updates };
      pages[pageIndex] = { ...pages[pageIndex], boxes };
      return { ...prev, pages };
    });
  }, []);

  const addPage = useCallback(() => {
    setConfig(prev => ({
      ...prev,
      pages: [...prev.pages, createDefaultPage()],
    }));
    setActivePage(prev => prev + 1);
  }, []);

  const removePage = useCallback((index: number) => {
    setConfig(prev => {
      if (prev.pages.length <= 1) return prev;
      const pages = prev.pages.filter((_, i) => i !== index);
      return { ...prev, pages };
    });
    setActivePage(prev => Math.min(prev, config.pages.length - 2));
  }, [config.pages.length]);

  return (
    <div className="flex flex-col h-screen bg-slate-100 overflow-hidden">
      <Toolbar
        config={config}
        activePage={activePage}
        pageCount={config.pages.length}
        onAddPage={addPage}
        onSelectPage={setActivePage}
        onRemovePage={removePage}
      />
      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        <ConfigPanel
          config={config}
          activePage={activePage}
          onUpdateConfig={updateConfig}
          onUpdatePage={(updates) => updatePage(activePage, updates)}
        />
        <WorksheetPreview
          config={config}
          activePage={activePage}
          onUpdateBox={(boxIndex, updates) => updateBox(activePage, boxIndex, updates)}
        />
      </div>
    </div>
  );
}
