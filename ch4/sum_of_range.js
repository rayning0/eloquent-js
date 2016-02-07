function range(start, end, step) {
  var ans = [];
  // if step is blank, it's both null and undefined
  if (step == null) step = 1;
  if (step < 0)
    for (var num = start; num >= end; num += step)
      ans.push(num);
  else
    for (var num = start; num <= end; num += step)
      ans.push(num);
  return ans;
}

function sum(arr) {
  var ans = 0;
  for (var i in arr)
    ans += arr[i];
  return ans;
}

console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
console.log(sum(range(1, 10)));