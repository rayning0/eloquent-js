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

function listToArray(list) {
  if (!list.value) { // empty list
    return []
  }

  const array = []

  do {
    array.push(list.value)
    list = list.rest
  } while (list !== null)
  return array
}

function prepend(value, list) {
  if (!list || !list.value) {
    list = null
  }
  return { value, rest: list }
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

describe('listToArray()', () => {
  test('handles empty list', () => {
    expect(listToArray({})).toEqual([])
  })

  test('handles list with 1 node', () => {
    expect(listToArray({ value: 5, rest: null })).toEqual([5])
  })

  test('handles list with multiple nodes', () => {
    const list = arrayToList([1, 5, 10, 15])
    expect(listToArray(list)).toEqual([1, 5, 10, 15])
  })
})

describe('prepend()', () => {
  test('adds element to front of empty list', () => {
    expect(prepend(5, {})).toEqual({ value: 5, rest: null })
  })

  test('adds value to front of list with multiple nodes', () => {
    expect(prepend(1, { value: 5, rest: { value: 10, rest: null } })).toEqual({
      value : 1,
      rest  : {
        value : 5,
        rest  : {
          value : 10,
          rest  : null
        }
      }
    })

    expect(prepend(10, prepend(20, null))).toEqual({
      value : 10,
      rest  : {
        value : 20,
        rest  : null
      }
    })
  })
})
