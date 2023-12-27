export const formatDate = (date) => {
    return (date.substring(0, 10).split('-').reverse().join('/'))
  }