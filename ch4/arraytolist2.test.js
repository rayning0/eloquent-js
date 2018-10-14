// const array = [1, 5, 10, 15, 20, 30, 50, 55]

function arrayToList(array) {
  if (array.length === 0) {
    return []
  }

  return {
    value : array[0],
    rest  : null
  }
}
describe('arrayToList()', () => {
  test('handles empty array', () => {
    expect(arrayToList([])).toEqual([])
  })

  test('handles array with 1 value', () => {
    expect(arrayToList([5])).toEqual({ value: 5, rest: null })
  })
})
