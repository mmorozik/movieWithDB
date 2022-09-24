const debounce = (fn, debounceTime) => {
  let time
  return function (...args) {
    clearTimeout(time)
    time = setTimeout(() => {
      fn.apply(this, args)
    }, debounceTime)
  }
}
export default debounce
