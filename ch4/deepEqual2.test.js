// Difference between == and ===
// https://codeburst.io/javascript-double-equals-vs-triple-equals-61d4ce5a121a

// Copying objects in JavaScript
// Shallow vs. Deep Copying. Copying by VALUE vs. REFERENCE.
// https://scotch.io/bar-talk/copying-objects-in-javascript

function deepEqual(obj1, obj2) {
  // specifically check for "null" because typeof null === 'object'
  if (obj1 === null || obj2 === null
    || typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return obj1 === obj2
  }

  // if both obj1 and obj2 are OBJECTS

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false
  }

  // ESLint normally blocks 'ForInStatement'.
  // A "for-in" loop will loop through all keys of an object.
  // Don't confuse "for-in" loop with "for-of" loop!
  // Deleted that part here: https://github.com/rayning0/eloquent-js/blob/master/.eslintrc#L21

  // I use "for-in" instead of Object.keys.forEach()
  // because we can't break out of middle of forEach() loop!
  // "for-in" lets us leave with "return" statement before looping through all keys.
  for (const key in obj1) {
    if (obj1[key] !== obj2[key]) {
      return false
    }
  }
  return true
}

describe('deepEqual()', () => {
  test('if obj1 or obj2 are NOT objects, use === to compare', () => {
    expect(deepEqual('cat', 'cat')).toEqual(true)
    expect(deepEqual('cat', 'dog')).toEqual(false)
    expect(deepEqual({ a: 1, b: 2 }, 'cat')).toEqual(false)
    expect(deepEqual(null, null)).toEqual(true)
    expect(deepEqual(null, 'cat')).toEqual(false)
    expect(deepEqual(null, { a: 1 })).toEqual(false)
    expect(deepEqual(null, undefined)).toEqual(false)
    expect(deepEqual(undefined, undefined)).toEqual(true)
  })

  test('if both objects are 1 level deep', () => {
    const obj = { here: 1, is: 'an', object: true }

    // Copy obj by VALUE, not REFERENCE. It means if you change obj2, obj won't change.
    const obj2 = { ...obj } // or Object.assign({}, obj)
    obj2.c = 5 // obj2 = { here: 1, is: 'an', object: true, c: 5 }

    // obj3 = { c: 5, here: 1, is: 'an', object: true }
    const obj3 = Object.assign({ c: 5 }, obj)

    const obj4 = { here: 1, is: 'cat', object: true }
    const obj5 = { here: 1, is: 'an', object: false }

    expect(deepEqual({}, {})).toEqual(true)
    expect(deepEqual({}, obj)).toEqual(false)
    expect(deepEqual(obj, obj)).toEqual(true)
    expect(deepEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toEqual(true)
    expect(deepEqual({ here: 1, is: 'an' }, obj)).toEqual(false)
    expect(deepEqual(obj, obj2)).toEqual(false)
    expect(deepEqual(obj, obj3)).toEqual(false)
    expect(deepEqual(obj, obj4)).toEqual(false)
    expect(deepEqual(obj, obj5)).toEqual(false)

    delete obj2.c // deletes key "c" from obj2
    expect(deepEqual(obj, obj2)).toEqual(true)
  })

  test('if both objects are 1 to multiple levels deep', () => {

  })
})
