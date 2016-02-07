function deepEqual(val1, val2) {
  if ((typeof val1 === 'object' && val1 !== null) &&
     (typeof val2 === 'object' && val2 !== null)) {

    var numKeys1 = 0, numKeys2 = 0;

    for (var key in val1) {
      console.log('key in val1: ' + key);
      numKeys1++;
    }

    for (var key in val2) {
      console.log('key in val2: ' + key);
      numKeys2++;

      if (!(key in val1) || !deepEqual(val1[key], val2[key]))
        return false;
    }
    return numKeys1 == numKeys2;
  }
  console.log('val1 = ' + val1 + ', val2 = ' + val2);
  return val1 === val2;
}

var obj = {here: {is: "an"}, object: 2};

console.log(deepEqual(obj, obj));

// key in val1: here
// key in val1: object
// key in val2: here
// key in val1: is
// key in val2: is
// val1 = an, val2 = an
// key in val2: object
// val1 = 2, val2 = 2
// true

console.log(deepEqual(obj, {here: 1, object: 2}));

// key in val1: here
// key in val1: object
// key in val2: here
// val1 = [object Object], val2 = 1
// false

console.log(deepEqual({here: {is: "an"}, object: 2}, obj));

// key in val1: here
// key in val1: object
// key in val2: here
// key in val1: is
// key in val2: is
// val1 = an, val2 = an
// key in val2: object
// val1 = 2, val2 = 2
// true

console.log(deepEqual(obj, {here: {here: {is: "an"}, object: 2}}));

// key in val1: here
// key in val1: object
// key in val2: here
// key in val1: is
// key in val2: here
// false

console.log(deepEqual(obj, {here: {is: 'an'}, object: 3}));

// key in val1: here
// key in val1: object
// key in val2: here
// key in val1: is
// key in val2: is
// val1 = an, val2 = an
// key in val2: object
// val1 = 2, val2 = 3
// false