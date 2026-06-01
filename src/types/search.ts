export type VehicleType = 'cars' | 'motorcycles' | 'trucks';

export interface ItemsData { 
  label: string, 
  value: string 
}

export type Phases = 'type' | 'brand' | 'model' | 'year';

export interface Datas {
  phase: Phases;
  value: string | null;
}