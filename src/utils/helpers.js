export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function formatPrice(price) {
  return `$${price.toFixed(2)}`
}

const LOS_ANGELES_TIMEZONE = 'America/Los_Angeles'
const weekdayIndexMap = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
}

const operatingHoursByDay = {
  0: { open: 8 * 60, close: 24 * 60, closeLabel: '12:00 AM' },
  1: { open: 7 * 60, close: 24 * 60, closeLabel: '12:00 AM' },
  2: { open: 7 * 60, close: 24 * 60, closeLabel: '12:00 AM' },
  3: { open: 7 * 60, close: 24 * 60, closeLabel: '12:00 AM' },
  4: { open: 7 * 60, close: 24 * 60, closeLabel: '12:00 AM' },
  5: { open: 7 * 60, close: 26 * 60, closeLabel: '2:00 AM' },
  6: { open: 7 * 60, close: 26 * 60, closeLabel: '2:00 AM' },
}

function getCafeDateParts(date = new Date()) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: LOS_ANGELES_TIMEZONE,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  const parts = Object.fromEntries(
    formatter.formatToParts(date).map((part) => [part.type, part.value])
  )

  return {
    weekday: parts.weekday,
    dayIndex: weekdayIndexMap[parts.weekday],
    hour: Number(parts.hour),
    minute: Number(parts.minute),
  }
}

function getCafeMinutes(parts = getCafeDateParts()) {
  return parts.hour * 60 + parts.minute
}

function getPreviousDayIndex(dayIndex) {
  return dayIndex === 0 ? 6 : dayIndex - 1
}

function getActiveSchedule(parts = getCafeDateParts()) {
  const currentMinutes = getCafeMinutes(parts)
  const currentSchedule = operatingHoursByDay[parts.dayIndex]
  const previousSchedule = operatingHoursByDay[getPreviousDayIndex(parts.dayIndex)]

  if (currentMinutes >= currentSchedule.open) {
    return {
      schedule: currentSchedule,
      carriesFromPreviousDay: false,
    }
  }

  if (
    previousSchedule.close > 24 * 60 &&
    currentMinutes < previousSchedule.close - 24 * 60
  ) {
    return {
      schedule: previousSchedule,
      carriesFromPreviousDay: true,
    }
  }

  return {
    schedule: currentSchedule,
    carriesFromPreviousDay: false,
  }
}

export function getCafeTimeLabel(date = new Date()) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: LOS_ANGELES_TIMEZONE,
    weekday: 'short',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  }).format(date)
}

export function getServiceStatus(date = new Date()) {
  const parts = getCafeDateParts(date)
  const currentMinutes = getCafeMinutes(parts)
  const { schedule, carriesFromPreviousDay } = getActiveSchedule(parts)
  const isOpen = carriesFromPreviousDay
    ? currentMinutes < schedule.close - 24 * 60
    : currentMinutes >= schedule.open && currentMinutes < schedule.close

  if (isOpen) {
    return {
      open: true,
      label: `Open now until ${schedule.closeLabel}`,
      detail:
        schedule.close > 24 * 60
          ? 'Late-night counter service is moving. Kitchen wraps 30 minutes before close.'
          : 'Counter service is active, and pickup is usually the fastest route during rush windows.',
    }
  }

  return {
    open: false,
    label: 'Currently closed',
    nextWindow:
      parts.dayIndex === 0
        ? 'Doors reopen Monday at 7:00 AM.'
        : 'Doors reopen later this morning for the next service window.',
  }
}

export function getWaitTime(date = new Date()) {
  const parts = getCafeDateParts(date)
  const currentMinutes = getCafeMinutes(parts)
  const offset = Math.floor(parts.minute / 15)
  const { schedule, carriesFromPreviousDay } = getActiveSchedule(parts)
  const isOpen = carriesFromPreviousDay
    ? currentMinutes < schedule.close - 24 * 60
    : currentMinutes >= schedule.open && currentMinutes < schedule.close

  if (!isOpen) {
    return {
      time: 'Opens soon',
      level: 'low',
      label: 'Counter Closed',
      recommendation: 'Check hours before heading over',
      description:
        'The kitchen is currently offline, so this is the best time to plan a pickup or late-night visit.',
    }
  }

  if ((parts.hour >= 10 && parts.hour < 14) || (parts.hour >= 18 && parts.hour < 21)) {
    return {
      time: `${18 + offset}–${25 + offset} min`,
      level: 'busy',
      label: 'Peak Rush',
      recommendation: 'Use curbside pickup',
      description:
        'This is one of the busiest windows of the day, especially for brunch and dinner-adjacent traffic.',
    }
  }

  if (
    (parts.hour >= 7 && parts.hour < 10) ||
    (parts.hour >= 14 && parts.hour < 18) ||
    (parts.hour >= 21 && parts.hour < 23)
  ) {
    return {
      time: `${10 + offset}–${16 + offset} min`,
      level: 'moderate',
      label: 'Steady Flow',
      recommendation: 'Walk in or order ahead',
      description:
        'Service is moving steadily, and both walk-in and pickup are solid options right now.',
    }
  }

  return {
    time: `${6 + offset}–${10 + offset} min`,
    level: 'low',
    label: 'Low Wait',
    recommendation: 'Walk in with confidence',
    description:
      'This is one of the faster counter windows, so walk-ins usually move through with minimal delay.',
  }
}

export function smoothScrollTo(target, offset) {
  const element = typeof target === 'string' ? document.querySelector(target) : target

  if (!element) return

  const resolvedOffset =
    typeof offset === 'number'
      ? offset
      : Number.parseFloat(
          window
            .getComputedStyle(document.documentElement)
            .getPropertyValue('--header-offset')
        ) || 88

  const top = Math.max(
    element.getBoundingClientRect().top + window.scrollY - resolvedOffset,
    0
  )
  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 'auto'
    : 'smooth'

  window.scrollTo({ top, behavior })
}
