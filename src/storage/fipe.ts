import { createMMKV } from "react-native-mmkv";
import { Fipe } from "../services/fipe-dto";

export const STORAGE_KEY_FIPE_DETAILS = "@info-vehicle:storage-details";

export const storageDetails = createMMKV({
  id: STORAGE_KEY_FIPE_DETAILS,
  readOnly: false,
});

export interface StorageFipe extends Fipe {
  yearId: string;
}

export interface StorageFipeDetails {
  1: StorageFipe[],
  2: StorageFipe[],
  3: StorageFipe[]
}

export function getStorageDetails(){
  const details: StorageFipeDetails | null = storageDetails.contains(STORAGE_KEY_FIPE_DETAILS)
                  ? JSON.parse(storageDetails.getString(STORAGE_KEY_FIPE_DETAILS)!)
                  : null;
  return details;
}

export function setStorageDetails(fipe: StorageFipe){
  const type = fipe.vehicleType;
  const details = getStorageDetails();
  const newDetails: StorageFipeDetails = {
    1: [],
    2: [],
    3: []
  };
  
  if(!details){
    newDetails[type] = [fipe];
    storageDetails.set(STORAGE_KEY_FIPE_DETAILS, JSON.stringify(newDetails));
  } else {
    const currentDetails = details[type];
    const newData = [fipe, ...currentDetails];
    details[type] = newData;
    storageDetails.set(STORAGE_KEY_FIPE_DETAILS, JSON.stringify(details));
  }
}

export function removeOneStorageDetail(fipe: StorageFipe){
  const details = getStorageDetails();
  if(details){
    const currentDetail = details[fipe.vehicleType];
    const editDetail = currentDetail.filter(current => current.codeFipe !== fipe.codeFipe);
    details[fipe.vehicleType] = editDetail;
    storageDetails.set(STORAGE_KEY_FIPE_DETAILS, JSON.stringify(details));
  }
}

export function removeStorageDetails(){
  storageDetails.remove(STORAGE_KEY_FIPE_DETAILS);
}

export function checkStorageDetail(fipe: StorageFipe){
  const details = getStorageDetails();
  if(details){
    const currentDetailType = details[fipe.vehicleType];
    const hasDetail = currentDetailType.find(current => current.codeFipe === fipe.codeFipe);
    return hasDetail ? true : false;
  } else {
    return false;
  }
}
