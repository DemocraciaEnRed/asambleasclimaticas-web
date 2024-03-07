export const formatDate = (date, toJoin = '/') => {
  return (date.substring(0, 10).split('-').reverse().join(toJoin))
}

export const ClosedProjectcheck = (closedAt) => {
  const today = new Date();
  const ClosedDate = new Date(closedAt)
  return ClosedDate <= today
}

export const RemainingDate = (firstDate, secondDate) => {
  const date1 = new Date(firstDate)
  const date2 = new Date(secondDate)
  const diffTime = Math.abs(date2 - date1)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}

export const progress = (total, remaining) => {
  return remaining * 100 / total
}

