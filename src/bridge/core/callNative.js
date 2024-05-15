import { v4 as uuid } from 'uuid'

import { BridgeService } from './BridgeService'

const TIMEOUT_SYMBOL = Symbol('hxapTimeout')
const DEFAULT_TIMEOUT = 10000

export async function callNative(
  eventName,
  payload,
  timeoutable = false,
  timeout = DEFAULT_TIMEOUT
) {
  try {
    if (typeof window === 'undefined') {
      throw new Error('window is undefined')
    }

    let dispatcher = null
    if (!!window.ReactNativeWebView) {
      dispatcher = window.ReactNativeWebView
    } else {
      throw new Error(`Not supported platform: ${eventName}`)
    }

    const id = `hx_${uuid()}`
    const message = JSON.stringify({
      id,
      name: eventName,
      payload: JSON.stringify(payload ?? {}),
    })

    const promises = []
    promises.push(postMessage(dispatcher, id, message))
    timeoutable && promises.push(createTimeout(timeout))

    const result = await Promise.race(promises)
    BridgeService.promiseMap.unregister(id)

    if (result === TIMEOUT_SYMBOL) {
      throw new Error(`callNative timeout ${id}, ${eventName}`)
    }

    const eventResult = result
    if (!eventResult) {
      throw new Error('eventResult is not HXAPEvent')
    }

    if (eventResult.payload) {
      try {
        return JSON.parse(eventResult.payload)
      } catch {
        return eventResult.payload
      }
    }
    return null
  } catch (error) {
    const err = error
    if (!!err) {
      console.error(`[HXAP] ${err.stack}`)
    } else {
      console.error(`[HXAP] `, error)
    }
    return null
  }
}

async function createTimeout(timeout) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(TIMEOUT_SYMBOL)
    }, timeout)
  })
}

function postMessage(dispatcher, id, message) {
  return new Promise(resolve => {
    BridgeService.promiseMap.register(id, resolve)
    dispatcher.postMessage(message)
  })
}
