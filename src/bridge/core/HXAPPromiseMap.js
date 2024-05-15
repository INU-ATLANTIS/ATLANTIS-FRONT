export class HXAPPromiseMap {
  #_promiseMap

  constructor() {
    this._promiseMap = {}
  }

  register(id, promise) {
    this._promiseMap[id] = promise
  }

  unregister(id) {
    if (this._promiseMap) {
      delete this._promiseMap[id]
    }
  }

  resolve(id, result) {
    const promise = this._promiseMap[id]
    promise?.(result)
  }
}
