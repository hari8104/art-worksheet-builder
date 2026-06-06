import { useRef, type ChangeEvent } from 'react';
import {
  AlignLeft, AlignCenter, AlignRight,
  Upload, Image, Trash2, Grid, Type, Moon, Sun,
} from 'lucide-react';
import type { WorksheetConfig, PageConfig, BoxAlignment } from '../types';

interface ConfigPanelProps {
  config: WorksheetConfig;
  activePage: number;
  onUpdateConfig: (updates: Partial<WorksheetConfig>) => void;
  onUpdatePage: (updates: Partial<PageConfig>) => void;
}

function SectionHeader({ icon, title, darkMode }: { icon: React.ReactNode; title: string; darkMode?: boolean }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-rose-500">{icon}</span>
      <h3 className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{title}</h3>
    </div>
  );
}

function Label({ children, darkMode }: { children: React.ReactNode; darkMode?: boolean }) {
  return <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{children}</label>;
}

function Input({ value, onChange, placeholder, className = '', darkMode = false }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  darkMode?: boolean;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400 transition-all ${
        darkMode
          ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-500'
          : 'bg-white border-slate-200 text-slate-900'
      } ${className}`}
    />
  );
}

function NumberInput({ value, onChange, min, max, darkMode = false }: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  darkMode?: boolean;
}) {
  return (
    <input
      type="number"
      value={value}
      min={min}
      max={max}
      onChange={e => onChange(Number(e.target.value))}
      className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400 text-center font-medium transition-all ${
        darkMode
          ? 'bg-slate-700 border-slate-600 text-slate-100'
          : 'bg-white border-slate-200 text-slate-900'
      }`}
    />
  );
}

function ImageUploadField({
  label,
  value,
  onChange,
  darkMode = false,
}: {
  label: string;
  value: string | null;
  onChange: (url: string | null) => void;
  darkMode?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <Label darkMode={darkMode}>{label}</Label>
      {value ? (
        <div className={`flex items-center gap-2 p-2 rounded-lg border ${
          darkMode
            ? 'bg-slate-700 border-slate-600'
            : 'bg-slate-50 border-slate-200'
        }`}>
          <img src={value} alt={label} className="w-10 h-10 object-contain rounded" />
          <span className={`text-xs flex-1 truncate ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Image uploaded</span>
          <button
            onClick={() => onChange(null)}
            className="text-red-400 hover:text-red-600 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 border-2 border-dashed rounded-lg text-xs transition-all ${
            darkMode
              ? 'border-slate-600 text-slate-400 hover:border-rose-400 hover:text-rose-400 hover:bg-slate-700'
              : 'border-slate-300 text-slate-500 hover:border-rose-400 hover:text-rose-500 hover:bg-rose-50'
          }`}
        >
          <Upload size={14} />
          Click to upload
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
}

export default function ConfigPanel({
  config,
  activePage,
  onUpdateConfig,
  onUpdatePage,
}: ConfigPanelProps) {
  const page = config.pages[activePage];

  const alignments: { value: BoxAlignment; icon: React.ReactNode }[] = [
    { value: 'left', icon: <AlignLeft size={14} /> },
    { value: 'center', icon: <AlignCenter size={14} /> },
    { value: 'right', icon: <AlignRight size={14} /> },
  ];

  return (
    <aside className={`w-full lg:w-72 border-b lg:border-r lg:border-b-0 overflow-y-auto flex-shrink-0 no-print lg:max-h-full max-h-64 transition-colors ${
      config.darkMode
        ? 'bg-slate-800 border-slate-700'
        : 'bg-white border-slate-200'
    }`}>
      <div className="p-4 space-y-6">

        {/* Header Settings */}
        <section>
          <SectionHeader icon={<Type size={14} />} title="Header" darkMode={config.darkMode} />
          <div className="space-y-3">
            <div>
              <Label darkMode={config.darkMode}>School / Studio Name</Label>
              <Input
                value={config.schoolName}
                onChange={v => onUpdateConfig({ schoolName: v })}
                placeholder="School name"
                darkMode={config.darkMode}
              />
            </div>
            <div>
              <Label darkMode={config.darkMode}>Tagline</Label>
              <Input
                value={config.tagline}
                onChange={v => onUpdateConfig({ tagline: v })}
                placeholder="Tagline"
                darkMode={config.darkMode}
              />
            </div>
            <div>
              <Label darkMode={config.darkMode}>Social Handle</Label>
              <Input
                value={config.socialHandle}
                onChange={v => onUpdateConfig({ socialHandle: v })}
                placeholder="@handle"
                darkMode={config.darkMode}
              />
            </div>
            <div>
              <Label darkMode={config.darkMode}>Worksheet Title</Label>
              <Input
                value={config.title}
                onChange={v => onUpdateConfig({ title: v })}
                placeholder="Worksheet title"
                darkMode={config.darkMode}
              />
            </div>
            <div>
              <Label darkMode={config.darkMode}>Student Class / Level</Label>
              <Input
                value={config.studentClass}
                onChange={v => onUpdateConfig({ studentClass: v })}
                placeholder="e.g. BUDS | BLOOSM"
                darkMode={config.darkMode}
              />
            </div>
            <div>
              <Label darkMode={config.darkMode}>Student Name (Optional)</Label>
              <Input
                value={config.studentName}
                onChange={v => onUpdateConfig({ studentName: v })}
                placeholder="Leave empty to hide"
                darkMode={config.darkMode}
              />
            </div>
            <div>
              <Label darkMode={config.darkMode}>Student Date (Optional)</Label>
              <Input
                value={config.studentDate}
                onChange={v => onUpdateConfig({ studentDate: v })}
                placeholder="Leave empty to hide"
                darkMode={config.darkMode}
              />
            </div>
          </div>
        </section>

        <div className={`border-t ${config.darkMode ? 'border-slate-700' : 'border-slate-100'}`} />

        {/* Branding */}
        <section>
          <SectionHeader icon={<Image size={14} />} title="Branding" darkMode={config.darkMode} />
          <div className="space-y-3">
            <ImageUploadField
              label="Header Logo"
              value={config.logoUrl}
              onChange={url => onUpdateConfig({ logoUrl: url })}
              darkMode={config.darkMode}
            />
            <ImageUploadField
              label="Watermark Image"
              value={config.watermarkUrl}
              onChange={url => onUpdateConfig({ watermarkUrl: url })}
              darkMode={config.darkMode}
            />
            <div className="flex items-center justify-between py-1">
              <span className={`text-xs font-medium ${config.darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Show Watermark</span>
              <button
                onClick={() => onUpdateConfig({ showWatermark: !config.showWatermark })}
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  config.showWatermark ? 'bg-rose-500' : config.darkMode ? 'bg-slate-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    config.showWatermark ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
            {config.showWatermark && (
              <div>
                <Label darkMode={config.darkMode}>Watermark Opacity: {Math.round(config.watermarkOpacity * 100)}%</Label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={config.watermarkOpacity}
                  onChange={e => onUpdateConfig({ watermarkOpacity: Number(e.target.value) })}
                  className={`w-full h-2 rounded-lg appearance-none cursor-pointer accent-rose-500 ${
                    config.darkMode ? 'bg-slate-600' : 'bg-slate-200'
                  }`}
                />
              </div>
            )}
          </div>
        </section>

        <div className={`border-t ${config.darkMode ? 'border-slate-700' : 'border-slate-100'}`} />

        {/* Grid Settings */}
        <section>
          <SectionHeader icon={<Grid size={14} />} title={`Page ${activePage + 1} Layout`} darkMode={config.darkMode} />
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label darkMode={config.darkMode}>Rows</Label>
                <NumberInput
                  value={page.rows}
                  onChange={v => onUpdatePage({ rows: Math.max(1, Math.min(10, v)) })}
                  min={1}
                  max={10}
                  darkMode={config.darkMode}
                />
              </div>
              <div>
                <Label darkMode={config.darkMode}>Columns</Label>
                <NumberInput
                  value={page.cols}
                  onChange={v => onUpdatePage({ cols: Math.max(1, Math.min(10, v)) })}
                  min={1}
                  max={10}
                  darkMode={config.darkMode}
                />
              </div>
            </div>

            <div>
              <Label darkMode={config.darkMode}>Grid Alignment</Label>
              <div className="flex gap-2 mt-1">
                {alignments.map(({ value, icon }) => (
                  <button
                    key={value}
                    onClick={() => onUpdatePage({ alignment: value })}
                    className={`flex-1 flex items-center justify-center py-2 rounded-lg border text-sm transition-all ${
                      page.alignment === value
                        ? 'bg-rose-50 border-rose-400 text-rose-600'
                        : config.darkMode
                        ? 'border-slate-600 text-slate-400 hover:border-slate-500 hover:bg-slate-700'
                        : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className={`border-t ${config.darkMode ? 'border-slate-700' : 'border-slate-100'}`} />

        {/* Dark Mode */}
        <section>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              {config.darkMode ? (
                <Moon size={14} className="text-slate-400" />
              ) : (
                <Sun size={14} className="text-slate-600" />
              )}
              <span className={`text-xs font-medium ${config.darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Dark Mode</span>
            </div>
            <button
              onClick={() => onUpdateConfig({ darkMode: !config.darkMode })}
              className={`relative w-10 h-5 rounded-full transition-colors ${
                config.darkMode ? 'bg-rose-500' : 'bg-slate-300'
              }`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  config.darkMode ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </section>

        <div className={`border-t ${config.darkMode ? 'border-slate-700' : 'border-slate-100'}`} />

        {/* Info */}
        <div className={`rounded-lg p-3 ${config.darkMode ? 'bg-slate-700' : 'bg-slate-50'}`}>
          <p className={`text-xs leading-relaxed ${config.darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Click any box in the worksheet to upload an image directly into it.
          </p>
        </div>
      </div>
    </aside>
  );
}
