import { useEffect } from 'react'
import { BridgeService } from './core'

export function useHXAP() {
  useEffect(() => {
    BridgeService.register()
    return () => {
      BridgeService.unregister()
    }
  }, [])
  return {
    processing: false,
  }
}
