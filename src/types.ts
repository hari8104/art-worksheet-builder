export type BoxAlignment = 'left' | 'center' | 'right';

export interface BoxConfig {
  id: string;
  imageUrl: string | null;
  label: string;
}

export interface PageConfig {
  id: string;
  rows: number;
  cols: number;
  boxWidth: number;
  boxHeight: number;
  alignment: BoxAlignment;
  boxes: BoxConfig[];
}

export interface WorksheetConfig {
  title: string;
  schoolName: string;
  tagline: string;
  socialHandle: string;
  logoUrl: string | null;
  watermarkUrl: string | null;
  showWatermark: boolean;
  studentClass: string;
  pages: PageConfig[];
}
