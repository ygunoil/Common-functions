export default function TimeTag (timetag) {
  let date = timetag.substr(0, 10)
  let time = timetag.substr(11, 5)
  return `${date} ${time}`
}