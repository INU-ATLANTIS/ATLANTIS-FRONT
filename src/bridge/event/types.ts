export type HXAPEventHandle = (...args: any) => void

export interface HXAPSystemEventHandler {
  eventName: string
  needLogin: boolean
  handle: HXAPEventHandle
  processing: boolean
}

export interface HXAPEventMap {
  back: () => void
}
export type HXAPEventUnsubscribe = () => void
