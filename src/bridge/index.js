import { platformSelect } from './utils/platformSelect'

import { loadData } from './actions/loadData'
import { saveData } from './actions/saveData'
import { removeData } from './actions/removeData'
import { getPlatform } from './actions/getPlatform'
import { showGeofencing } from './actions/showGeofencing'

import { virtualLoadData } from './virtual-actions/loadData'
import { virtualSaveData } from './virtual-actions/saveData'
import { virtualRemoveData } from './virtual-actions/removeData'

export const mobileHXAP = {
  loadData,
  saveData,
  removeData,
  getPlatform,
  showGeofencing,
}

const virtualHXAP = {
  loadData: virtualLoadData,
  saveData: virtualSaveData,
  removeData: virtualRemoveData,
  getPlatform,
  showGeofencing: undefined,
}

export const HXAP = platformSelect({
  android: mobileHXAP,
  ios: mobileHXAP,
  unknown: virtualHXAP,
})
