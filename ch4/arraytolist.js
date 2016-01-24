'use strict';

var a = [1, 5, 10, 15, 20, 30, 50, 55];

function arrayToList(arr) {
  var next = {value: arr[arr.length - 1], rest: null}
  var lastIndex = arr.length - 1;
  var node;

  console.log("i: " + lastIndex + ", value: " + arr[lastIndex] + ", rest: " + next.rest);

  for (var i = arr.length - 2; i >= 0; i--) {
    node = {value: arr[i], rest: next};

    console.log("i: " + i + ", value: " + arr[i] + ", next value: " + next.value + ", next rest: " + next.rest);

    next = node;
  }
  console.log();
  return node;
}

function printNode(node) {
  var ans = '';
  do {
    ans += '{ value: ' + node.value + ', rest: ';
    var node = node.rest;
  } while (node != null);
  ans += 'null }';

  console.log(ans);
}

printNode(arrayToList(a));

/* output:

>> node arraytolist.js
i: 7, value: 55, rest: null
i: 6, value: 50, next value: 55, next rest: null
i: 5, value: 30, next value: 50, next rest: [object Object]
i: 4, value: 20, next value: 30, next rest: [object Object]
i: 3, value: 15, next value: 20, next rest: [object Object]
i: 2, value: 10, next value: 15, next rest: [object Object]
i: 1, value: 5, next value: 10, next rest: [object Object]
i: 0, value: 1, next value: 5, next rest: [object Object]

{ value: 1, rest: { value: 5, rest: { value: 10, rest: { value: 15, rest: { value: 20, rest: { value: 30, rest: { value: 50, rest: { value: 55, rest: null }
*/