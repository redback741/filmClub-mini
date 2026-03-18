export function formatTimestamp(input, format = 'yyyy-mm-dd') {
  if (input === null || input === undefined || input === '') return ''

  let ms = null
  if (typeof input === 'number') {
    ms = input < 1e12 ? input * 1000 : input
  } else if (typeof input === 'string') {
    const s = input.trim()
    if (!s) return ''
    if (/^\d+$/.test(s)) {
      const n = Number(s)
      if (!Number.isFinite(n)) return ''
      ms = n < 1e12 ? n * 1000 : n
    } else {
      const parsed = Date.parse(s)
      if (!Number.isFinite(parsed)) return ''
      ms = parsed
    }
  } else if (input instanceof Date) {
    ms = input.getTime()
  }

  if (!Number.isFinite(ms)) return ''
  const d = new Date(ms)
  if (Number.isNaN(d.getTime())) return ''

  const yyyy = String(d.getFullYear())
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const hh = String(d.getHours()).padStart(2, '0')
  const MM = String(d.getMinutes()).padStart(2, '0')
  const ss = String(d.getSeconds()).padStart(2, '0')

  return String(format).replace(/yyyy|mm|dd|hh|MM|ss/g, (token) => {
    switch (token) {
      case 'yyyy':
        return yyyy
      case 'mm':
        return mm
      case 'dd':
        return dd
      case 'hh':
        return hh
      case 'MM':
        return MM
      case 'ss':
        return ss
      default:
        return token
    }
  })
}

