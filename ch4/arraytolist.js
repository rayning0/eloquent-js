var array = [1, 5, 10, 15, 20, 30, 50, 55];

function arrayToList(arr) {
  var list = null
  for (var i = arr.length - 1; i >= 0; i--) {
    list = {value: arr[i], rest: list};
  }
  return list;
}

function listToArray(list) {
  var array = [];
  do {
    array.push(list.value);
    list = list.rest;
  } while (list != null);
  return array;
}

// Book's soluion is better
// function listToArray(list) {
//   var array = [];
//   for (var node = list; node; node = node.rest)
//     array.push(node.value);
//   return array;
// }

function prepend(value, list) {
  return {value: value, rest: list};
}

function nth(list, n) {
  return listToArray(list)[n];
}

//recursive solution
function nth(list, n) {
  if (!list)
    return undefined;
  else if (n == 0)
    return list.value;
  else
    return nth(list.rest, n - 1);
}

function printNode(node) {
  var ans = '';
  var listSize = 0;
  do {
    ans += '{value: ' + node.value + ', rest: ';
    var node = node.rest;
    listSize += 1;
  } while (node != null);

  ans += 'null';
  for (var i = 0; i < listSize; i++)
    ans += '}';

  console.log(ans);
}

var list = arrayToList(array)
printNode(list);
console.log(listToArray(list));
printNode(prepend(100, prepend(20, prepend(30, null))));
console.log(nth(list, 5));
console.log(nth(list, 10));

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

{value: 1, rest: {value: 5, rest: {value: 10, rest: {value: 15, rest: {value: 20, rest: {value: 30, rest: {value: 50, rest: {value: 55, rest: null}}}}}}}}
[ 1, 5, 10, 15, 20, 30, 50, 55 ]
{value: 100, rest: {value: 20, rest: {value: 30, rest: null}}}
30
undefined

*/