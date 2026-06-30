// Formats a 'YYYY-MM-DD' string as e.g. "June 30, 2026".
// Parsed manually (rather than `new Date(dateStr)`) to avoid timezone
// shifting the date backward by a day in some browsers.
export function formatDate(dateStr) {
  if (!dateStr) return ''
  const [year, month, day] = dateStr.split('-').map(Number)
  if (!year || !month || !day) return dateStr

  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
