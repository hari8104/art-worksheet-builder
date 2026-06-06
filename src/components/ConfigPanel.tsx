import { useRef, type ChangeEvent } from 'react';
import {
  AlignLeft, AlignCenter, AlignRight,
  Upload, Image, Trash2, Grid, Type,
} from 'lucide-react';
import type { WorksheetConfig, PageConfig, BoxAlignment } from '../types';

interface ConfigPanelProps {
  config: WorksheetConfig;
  activePage: number;
  onUpdateConfig: (updates: Partial<WorksheetConfig>) => void;
  onUpdatePage: (updates: Partial<PageConfig>) => void;
}

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-rose-500">{icon}</span>
      <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">{title}</h3>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-medium text-slate-600 mb-1">{children}</label>;
}

function Input({ value, onChange, placeholder, className = '' }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400 bg-white transition-all ${className}`}
    />
  );
}

function NumberInput({ value, onChange, min, max }: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <input
      type="number"
      value={value}
      min={min}
      max={max}
      onChange={e => onChange(Number(e.target.value))}
      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400 bg-white text-center font-medium"
    />
  );
}

function ImageUploadField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string | null;
  onChange: (url: string | null) => void;
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
      <Label>{label}</Label>
      {value ? (
        <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200">
          <img src={value} alt={label} className="w-10 h-10 object-contain rounded" />
          <span className="text-xs text-slate-500 flex-1 truncate">Image uploaded</span>
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
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 border-2 border-dashed border-slate-300 rounded-lg text-xs text-slate-500 hover:border-rose-400 hover:text-rose-500 hover:bg-rose-50 transition-all"
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
    <aside className="w-72 bg-white border-r border-slate-200 overflow-y-auto flex-shrink-0 no-print">
      <div className="p-4 space-y-6">

        {/* Header Settings */}
        <section>
          <SectionHeader icon={<Type size={14} />} title="Header" />
          <div className="space-y-3">
            <div>
              <Label>School / Studio Name</Label>
              <Input
                value={config.schoolName}
                onChange={v => onUpdateConfig({ schoolName: v })}
                placeholder="School name"
              />
            </div>
            <div>
              <Label>Tagline</Label>
              <Input
                value={config.tagline}
                onChange={v => onUpdateConfig({ tagline: v })}
                placeholder="Tagline"
              />
            </div>
            <div>
              <Label>Social Handle</Label>
              <Input
                value={config.socialHandle}
                onChange={v => onUpdateConfig({ socialHandle: v })}
                placeholder="@handle"
              />
            </div>
            <div>
              <Label>Worksheet Title</Label>
              <Input
                value={config.title}
                onChange={v => onUpdateConfig({ title: v })}
                placeholder="Worksheet title"
              />
            </div>
            <div>
              <Label>Student Class / Level</Label>
              <Input
                value={config.studentClass}
                onChange={v => onUpdateConfig({ studentClass: v })}
                placeholder="e.g. BUDS | BLOOSM"
              />
            </div>
          </div>
        </section>

        <div className="border-t border-slate-100" />

        {/* Branding */}
        <section>
          <SectionHeader icon={<Image size={14} />} title="Branding" />
          <div className="space-y-3">
            <ImageUploadField
              label="Header Logo"
              value={config.logoUrl}
              onChange={url => onUpdateConfig({ logoUrl: url })}
            />
            <ImageUploadField
              label="Watermark Image"
              value={config.watermarkUrl}
              onChange={url => onUpdateConfig({ watermarkUrl: url })}
            />
            <div className="flex items-center justify-between py-1">
              <span className="text-xs font-medium text-slate-600">Show Watermark</span>
              <button
                onClick={() => onUpdateConfig({ showWatermark: !config.showWatermark })}
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  config.showWatermark ? 'bg-rose-500' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    config.showWatermark ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        <div className="border-t border-slate-100" />

        {/* Grid Settings */}
        <section>
          <SectionHeader icon={<Grid size={14} />} title={`Page ${activePage + 1} Layout`} />
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Rows</Label>
                <NumberInput
                  value={page.rows}
                  onChange={v => onUpdatePage({ rows: Math.max(1, Math.min(10, v)) })}
                  min={1}
                  max={10}
                />
              </div>
              <div>
                <Label>Columns</Label>
                <NumberInput
                  value={page.cols}
                  onChange={v => onUpdatePage({ cols: Math.max(1, Math.min(10, v)) })}
                  min={1}
                  max={10}
                />
              </div>
            </div>

            <div>
              <Label>Grid Alignment</Label>
              <div className="flex gap-2 mt-1">
                {alignments.map(({ value, icon }) => (
                  <button
                    key={value}
                    onClick={() => onUpdatePage({ alignment: value })}
                    className={`flex-1 flex items-center justify-center py-2 rounded-lg border text-sm transition-all ${
                      page.alignment === value
                        ? 'bg-rose-50 border-rose-400 text-rose-600'
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

        <div className="border-t border-slate-100" />

        {/* Info */}
        <div className="bg-slate-50 rounded-lg p-3">
          <p className="text-xs text-slate-500 leading-relaxed">
            Click any box in the worksheet to upload an image directly into it.
          </p>
        </div>
      </div>
    </aside>
  );
}
