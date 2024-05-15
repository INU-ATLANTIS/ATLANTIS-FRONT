import { HXAP } from '../index'

import { HXAPPromiseMap } from './HXAPPromiseMap'
import { mount } from '../actions/mount'

export class BridgeServiceClass {
  #_promiseMap
  #_systemEventHandles
  #_eventHandles
  #_deferredEventQueue
  #_timer

  constructor() {
    this._promiseMap = new HXAPPromiseMap()
    this._systemEventHandles = {}
    this._eventHandles = {}
    this._deferredEventQueue = []
    this._timer = null
  }

  get promiseMap() {
    return this._promiseMap
  }

  async register(...handlers) {
    if (typeof window === 'undefined') return
    handlers.map(handler => {
      this._systemEventHandles[handler.eventName] = {
        ...handler,
      }
    })
    window.addEventListener('loginState', this.handleLoginState.bind(this))

    switch (HXAP.getPlatform()) {
      case 'ios':
        window.addEventListener('message', this.handleMessage.bind(this))
        break
      case 'android':
        document.addEventListener('message', this.handleMessage.bind(this))
        break
    }
    await mount()
  }

  unregister() {
    switch (HXAP.getPlatform()) {
      case 'ios':
        window.removeEventListener('message', this.handleMessage.bind(this))
        break
      case 'android':
        document.removeEventListener('message', this.handleMessage.bind(this))
        break
    }
    window.removeEventListener('loginState', this.handleLoginState.bind(this))
  }

  addListener(event, listener) {
    if (!this._eventHandles[event]) {
      this._eventHandles[event] = []
    }
    this._eventHandles[event].push(listener)

    return () => {
      this._eventHandles[event] = this._eventHandles[event].filter(
        handle => handle !== listener
      )
    }
  }

  addDeferredEventQueue(event) {
    this._deferredEventQueue.push(event)
  }

  dispatchSystemEvent(event) {
    const handler = this._systemEventHandles[event.name]
    if (!handler) return false

    if (this._timer !== null) {
      clearTimeout(this._timer)
      this._timer = null
    }

    this._timer = setTimeout(() => {
      if (handler.needLogin) {
        this.addDeferredEventQueue(event)
      } else {
        const eventPayload = JSON.parse(event.payload ?? '{}')
        handler.handle(eventPayload)
      }
    }, 100)
    return true
  }

  dispatchNativeEvent(event) {
    const handler = this._eventHandles[event.name]
    if (!handler) return false

    const payload = JSON.parse(event.payload ?? '{}')
    handler.forEach(handle => {
      handle(payload)
    })
    return true
  }

  handleMessage(event) {
    const payload = JSON.parse(event.data)
    if (
      !payload ||
      this.dispatchSystemEvent(payload) ||
      this.dispatchNativeEvent(payload)
    ) {
      return
    }

    this.promiseMap.resolve(payload.id, payload)
  }

  handleLoginState(event) {
    if (!event.detail.loginState) return

    this._deferredEventQueue.forEach(hxapEvent =>
      this.dispatchSystemEvent(hxapEvent)
    )
    this._deferredEventQueue = []
  }
}

export const BridgeService = new BridgeServiceClass()
