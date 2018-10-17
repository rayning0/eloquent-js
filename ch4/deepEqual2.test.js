// Difference between == and ===
// https://codeburst.io/javascript-double-equals-vs-triple-equals-61d4ce5a121a

// Copying objects in JavaScript
// Shallow vs. Deep Copying. Copying by VALUE vs. REFERENCE.
// https://scotch.io/bar-talk/copying-objects-in-javascript

function deepEqual(obj1, obj2) {
  // specifically check for "null" because typeof null === 'object'
  if (obj1 === null || obj2 === null || typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    console.log(`val1: ${obj1}. val2: ${obj2}`)
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
    // Reason for Object.prototype.hasOwnProperty() here: https://stackoverflow.com/a/1963179/2175188
    // And here: https://eslint.org/docs/rules/no-prototype-builtins
    if (Object.prototype.hasOwnProperty.call(obj1, key)) {
      console.log(`key: ${key}`)

      // If key from obj1 is NOT in obj2, or deepEqual(val1, val2) is FALSE
      if (!(key in obj2) || !deepEqual(obj1[key], obj2[key])) {
        console.log('---FALSE---')
        return false
      }
    }
  }
  console.log('---TRUE---')
  return true

  // Strangely, all tests below pass with these 6 lines.
  // But this doesn't dig into bottom of each object.

  // for (const key in obj1) {
  //   if (obj1[key] !== obj2[key]) {
  //     return false
  //   }
  // }
  // return true
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
    const obj = { here: 1, is: 'an', dog: true }

    // Copy obj by VALUE, not REFERENCE. It means if you change obj2, obj won't change.
    const obj2 = { ...obj } // or Object.assign({}, obj)
    obj2.c = 5 // obj2 = { here: 1, is: 'an', dog: true, c: 5 }

    // obj3 = { c: 5, here: 1, is: 'an', dog: true }
    const obj3 = Object.assign({ c: 5 }, obj)

    const obj4 = { here: 1, is: 'cat', dog: true }
    const obj5 = { here: 1, is: 'an', dog: false }

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
    const obj = { here: { is: 'an' }, dog: 2 }

    // Deep copy of obj, down multiple levels. When copy is changed, original stays unchanged.
    const obj2 = JSON.parse(JSON.stringify(obj))
    obj2.here.is = 'blah' // { here: { is: 'blah' }, dog: 2 }
    const obj3 = JSON.parse(JSON.stringify(obj))
    obj3.dog = 3 // { here: { is: 'an' }, dog: 3 }
    const obj4 = JSON.parse(JSON.stringify(obj))
    obj4.here.is = { deeper: true } // { here: { is: { deeper: true }}, dog: 2 }
    const obj5 = JSON.parse(JSON.stringify(obj4))
    // obj5 = { here: { is: { deeper: true }}, dog: { deep: { deeper: 4 }}}
    obj5.dog = { deep: { deeper: 4 } }
    const obj6 = JSON.parse(JSON.stringify(obj5))
    obj6.dog.deep.deeper = 5 // { here: { is: { deeper: true }}, dog: { deep: { deeper: 5 }}}

    console.log('****** obj vs obj ******')
    expect(deepEqual(obj, obj)).toEqual(true)
    console.log('****** obj vs { here: 1, dog: 2 } ******')
    expect(deepEqual(obj, { here: 1, dog: 2 })).toEqual(false)
    console.log('****** obj vs obj2 ******')
    expect(deepEqual(obj, obj2)).toEqual(false)
    console.log('****** obj vs obj3 ******')
    expect(deepEqual(obj, obj3)).toEqual(false)
    console.log('****** obj vs obj4 ******')
    expect(deepEqual(obj, obj4)).toEqual(false)
    console.log('****** obj4 vs obj4 ******')
    expect(deepEqual(obj4, obj4)).toEqual(true)
    console.log('****** obj4 vs obj5 ******')
    expect(deepEqual(obj4, obj5)).toEqual(false)
    console.log('****** obj5 vs obj5 ******')
    expect(deepEqual(obj5, obj5)).toEqual(true)
    console.log('****** obj5 vs obj6 ******')
    expect(deepEqual(obj5, obj6)).toEqual(false)
  })
})

// Output of last block of tests:

// ****** obj vs obj ******
// key: here
// key: is
// val1: an.val2: an
// --- TRUE ---
// key: dog
// val1: 2. val2: 2
// --- TRUE ---

// ****** obj vs { here: 1, dog: 2 } ******
// key: here
// val1: [object Object].val2: 1
// --- FALSE ---

// ****** obj vs obj2 ******
// key: here
// key: is
// val1: an.val2: blah
// --- FALSE ---
// --- FALSE ---

// ****** obj vs obj3 ******
// key: here
// key: is
// val1: an.val2: an
// --- TRUE ---
// key: dog
// val1: 2. val2: 3
// --- FALSE ---

//   ****** obj vs obj4 ******
// key: here
// key: is
// val1: an.val2: [object Object]
// --- FALSE ---
// --- FALSE ---

// ****** obj4 vs obj4 ******
// key: here
// key: is
// key: deeper
// val1: true.val2: true
// --- TRUE ---
// --- TRUE ---
// key: dog
// val1: 2. val2: 2
// --- TRUE ---

// ****** obj4 vs obj5 ******
// key: here
// key: is
// key: deeper
// val1: true.val2: true
// --- TRUE ---
// --- TRUE ---
// key: dog
// val1: 2. val2: [object Object]
// --- FALSE ---

// ****** obj5 vs obj5 ******
// key: here
// key: is
// key: deeper
// val1: true.val2: true
// --- TRUE ---
// --- TRUE ---
// key: dog
// key: deep
// key: deeper
// val1: 4. val2: 4
// --- TRUE ---
// --- TRUE ---
// --- TRUE ---

// ****** obj5 vs obj6 ******
// key: here
// key: is
// key: deeper
// val1: true.val2: true
// --- TRUE ---
// --- TRUE ---
// key: dog
// key: deep
// key: deeper
// val1: 4. val2: 5
// --- FALSE ---
// --- FALSE ---
// --- FALSE ---
