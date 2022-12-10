import {isSameDay, isSameYear} from 'date-fns'

const months = ["января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря"]

function toLocaleNewsString(date) {
  let now = new Date();
  if (isSameDay(date, now)) {
    return date.toLocaleTimeString();
  } else if (isSameYear(date, now)) {
    return date.getDate() + ' ' + months[date.getMonth()]
  } else {
    return date.toLocaleDateString();
  }
}

export { toLocaleNewsString }