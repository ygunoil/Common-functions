
export function makeTimer (iterator, duration = 1000) {
  let counter = 0
  let _duration = duration

  if (typeof iterator !== 'function') return {}

  return {
    stop () {
      clearTimeout(counter)
      return this
    },
    changeDuration (val) {
      _duration = val
      this.start()
    },
    start () {
      this.stop()

      const next = () => {
        iterator()

        counter = setTimeout(next, _duration)
      }
      next()

      return this
    }
  }
}