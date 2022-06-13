export const reverse = (string: string) => {
  return string.split('').reverse().join('')
}

export const average = (array: number[]) => {
  const reducer = (sum: number, item: number): number => {
    return sum + item
  }

  return array.reduce(reducer, 0) / array.length
}
