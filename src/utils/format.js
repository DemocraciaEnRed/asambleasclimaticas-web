export const formatDate = (date, toJoin = '/') => {
  return (date.substring(0, 10).split('-').reverse().join(toJoin))
}