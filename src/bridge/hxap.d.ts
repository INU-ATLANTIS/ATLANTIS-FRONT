import { MessageDispatcher, ReactNativeEvent } from './core/types'

declare global {
  interface Window {
    ReactNativeWebView?: MessageDispatcher
  }

  interface DocumentEventMap {
    message: ReactNativeEvent
  }
}
