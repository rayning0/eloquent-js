function reverseArray(arr) {
  var ans = [];
  for (var i = arr.length - 1; i >= 0; i--)
    ans.push(arr[i]);
  return ans;
}

function reverseArrayInPlace(arr) {
  for (var i = 0; i < Math.floor(arr.length / 2); i++) {
    var temp = arr[i];
    arr[i] = arr[arr.length - i - 1];
    arr[arr.length - i - 1] = temp;
  }
  return arr;
}

console.log(reverseArray(["A", "B", "C"]));

var arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);