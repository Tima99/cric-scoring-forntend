import React from 'react'

// Classify one delivery of the over: values come from the API as
// "0".."6" (runs), "W" (wicket), "wd", "nb", "nb+N", "lb+N", "bye+N"
export const ballType = (value) => {
  const v = String(value ?? '').toLowerCase()
  if (v === 'w') return 'wicket'
  if (v === '6') return 'six'
  if (v === '4') return 'four'
  if (v === '0') return 'dot'
  if (/^(wd|nb|lb|bye)/.test(v)) return 'extra'
  return 'run'
}

const label = (value) => {
  const v = String(value ?? '')
  const low = v.toLowerCase()
  if (low.startsWith('bye')) return 'B' + v.slice(3).replace('+', '')
  if (low.startsWith('lb')) return 'Lb' + v.slice(2).replace('+', '')
  if (low.startsWith('wd')) return 'Wd'
  if (low.startsWith('nb')) return 'Nb' + v.slice(2)
  return v
}

// One ball bubble: red = wicket, aqua = six, green = four, amber = extras
export const SpellBall = ({ value }) => {
  const type = ballType(value)
  const text = label(value)
  return (
    <li className={`ball ball-${type} ${text.length > 2 ? 'ball-long' : ''}`} title={String(value)}>
      {text}
    </li>
  )
}
