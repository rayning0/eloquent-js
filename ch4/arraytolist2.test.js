// const array = [1, 5, 10, 15, 20, 30, 50, 55]

function arrayToList(array) {
  if (array.length === 0) {
    return []
  }
}
describe('arrayToList()', () => {
  test('handles empty array', () => {
    expect(arrayToList([])).toEqual([])
  })
})
