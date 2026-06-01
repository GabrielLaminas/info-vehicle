export interface FipeResponse {
  code: string;
  name: string;
}

enum VehicleType {
  cars = 1,
  motorcycles = 2, 
  trucks = 3
} 

interface priceHistory {
  month: string;
  price: string;
  reference: string;
}

export interface Fipe {
  vehicleType: VehicleType,
  price: string;
  priceHistory: priceHistory[];
  brand: string;
  model: string;
  modelYear: number;
  fuel: string;
  codeFipe: string;
  referenceMonth: string;
  fuelAcronym: string;
}