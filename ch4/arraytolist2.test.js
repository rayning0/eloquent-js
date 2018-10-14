function arrayToList(array) {
  if (array.length === 0) {
    return []
  }
  let list = null

  for (let i = array.length - 1; i >= 0; i--) {
    list = {
      value : array[i],
      rest  : list
    }
  }
  return list
}

describe('arrayToList()', () => {
  test('handles empty array', () => {
    expect(arrayToList([])).toEqual([])
  })

  test('handles array with 1 value', () => {
    expect(arrayToList([5])).toEqual({ value: 5, rest: null })
  })

  test('handles array with multiple values', () => {
    expect(arrayToList([1, 5, 10, 15])).toEqual({
      value : 1,
      rest  : {
        value : 5,
        rest  : {
          value : 10,
          rest  : {
            value : 15,
            rest  : null
          }
        }
      }
    })
  })
})
