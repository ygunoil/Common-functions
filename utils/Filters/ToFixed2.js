export default function ToFixed2 (val) {
  if (!val) return val
  return +(+val).toFixed(2)
}