export const formatDate = (date, toJoin = '/') => {
  return (date.substring(0, 10).split('-').reverse().join(toJoin))
}

export const ClosedProjectcheck = (closedAt) => {
  const today = new Date();
  const ClosedDate = new Date(closedAt)
  return ClosedDate <= today
}
