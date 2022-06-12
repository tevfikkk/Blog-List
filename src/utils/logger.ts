/* eslint-disable @typescript-eslint/no-explicit-any */
export const info = (...params: any[]) => {
  console.log(...params)
}

export const error = (...params: any[]) => {
  console.error(...params)
}
