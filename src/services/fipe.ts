import { ItemsData, VehicleType } from "../types/search";
import { FipeResponse, Fipe } from "./fipe-dto";

export const URL_API = `${process.env.EXPO_PUBLIC_API_URL}/${process.env.EXPO_PUBLIC_API_PREFIX}`;
const HEADERS = {
  'Content-Type': 'application/json',
  'X-Subscription-Token': process.env.EXPO_PUBLIC_API_FIPE
}

export async function getFipeBrand(vehicleType: VehicleType){
  try {
    const response = await fetch(`${URL_API}/${vehicleType}/brands`, { headers: HEADERS });

    if(!response.ok){
      throw Error(`Erro ao pegar brands ${response.status}`)
    }

    const data = await response.json() as FipeResponse[];
    const brands = data.map(({ name, code }) => ({ label: name, value: code }));
    return brands as ItemsData[];
  } catch (error) {
    console.log(error);
  }
}

export async function getFipeModels(vehicleType: VehicleType, brands: string){
  try {
    const response = await fetch(`${URL_API}/${vehicleType}/brands/${brands}/models`, { headers: HEADERS });
    
    if(!response.ok){
      throw Error(`Erro ao pegar models ${response.status}`)
    }

    const data = await response.json() as FipeResponse[];
    const models = data.map(({ name, code }) => ({ label: name, value: code }));
    return models as ItemsData[];
  } catch (error) {
    console.log(error);
  }
}

export async function getFipeModelsYears(vehicleType: VehicleType, brands: string, models: string){
  try {
    const response = await fetch(`${URL_API}/${vehicleType}/brands/${brands}/models/${models}/years`, { headers: HEADERS });
    
    if(!response.ok){
      throw Error(`Erro ao pegar anos ${response.status}`)
    }

    const data = await response.json() as FipeResponse[];
    const years = data.map(({ name, code }) => ({ label: name, value: code }));
    return years as ItemsData[];
  } catch (error) {
    console.log(error);
  }
}

export async function getFipeInformation(url_api: string){
  try {
    const response = await fetch(`${url_api}`, { headers: HEADERS });
    
    if(!response.ok){
      throw Error(`Erro ao pegar informações fipe ${response.status}`)
    }

    const data = await response.json();
    return data as Fipe;
  } catch (error) {
    console.log(error);
  }
}

export async function getFipeInformationHistory(vehicleType: VehicleType, fipeCode: string, yearId: string){
  try {
    const url = `${URL_API}/${vehicleType}/${fipeCode}/years/${yearId}/history`;
    const response = await fetch(url, { headers: HEADERS });
    
    if(!response.ok){
      throw Error(`Erro ao pegar informações fipe ${response.status}`)
    }

    const data = await response.json();
    return data as Fipe;
  } catch (error) {
    console.log(error);
  }
}