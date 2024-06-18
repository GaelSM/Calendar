const DAYS_OF_MONTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const LEAP_DAY_OF_MONTHS = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const NAME_OF_MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octube", "Noviembre", "Diciembre"]
const NAME_OF_DAYS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
const NUMBER_OF_MONTHS = 12

function isLeapYear(year) {
  if(year % 4 === 0) {
    if(year % 100 === 0) {
      if(year % 400 === 0) return true
      return false
    }
    return true
  }

  return false
}

function select(selector) {
  return document.querySelector(selector)
}

function getCurrentDate() {
  const date = new Date(new Date().getFullYear(), 0, 1)
  const daysOfMonths = isLeapYear(date.getFullYear()) ? LEAP_DAY_OF_MONTHS : DAYS_OF_MONTHS

  return {date, daysOfMonths}
}

const monthsElement = select(".months")
const titleElement = select(".title")

const { date, daysOfMonths } = getCurrentDate()

titleElement.textContent = date.getFullYear()

function insertWeek(element) {
  for(let i = 0; i < NAME_OF_DAYS.length; i++) {
    const day = document.createElement("li")
    day.textContent = NAME_OF_DAYS[i]
    element.append(day)
  }
}

function insertDays(element, currentMonth) {
  for(let j = 1; j <= daysOfMonths[currentMonth]; j++) {
    const day = document.createElement("li")
    day.textContent = j

    if(j === 1) day.style.gridColumnStart = date.getDay() + 1

    element.append(day)
  }
}

for(let currentMonth = 0; currentMonth < NUMBER_OF_MONTHS; currentMonth++) {
  const month = document.createElement("div")
  month.className = "month"

  const monthName = document.createElement("h2")
  monthName.textContent = NAME_OF_MONTHS[currentMonth]

  const days = document.createElement("ol")

  insertWeek(days)
  insertDays(days, currentMonth)

  monthsElement.append(month)

  month.append(monthName)
  month.append(days)

  date.setMonth(date.getMonth() + 1)
}