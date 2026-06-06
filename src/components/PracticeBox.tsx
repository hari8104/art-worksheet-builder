import { useRef, type ChangeEvent } from 'react';
import { Upload, X } from 'lucide-react';
import type { BoxConfig } from '../types';

interface PracticeBoxProps {
  box: BoxConfig;
  index: number;
  onUpdate: (updates: Partial<BoxConfig>) => void;
}

export default function PracticeBox({ box, index, onUpdate }: PracticeBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onUpdate({ imageUrl: reader.result as string });
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div className="practice-box relative border border-slate-800 bg-white overflow-hidden group">
      {box.imageUrl ? (
        <>
          <img
            src={box.imageUrl}
            alt={`Box ${index + 1}`}
            className="w-full h-full object-contain"
          />
          <button
            onClick={() => onUpdate({ imageUrl: null })}
            className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity no-print"
          >
            <X size={10} />
          </button>
        </>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          className="w-full h-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity no-print text-slate-300 hover:text-rose-400"
        >
          <Upload size={18} />
          <span className="text-xs mt-1">Upload</span>
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
