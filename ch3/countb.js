function countBs(str) {
  return countChar(str, 'B');
}

function countChar(str, char) {
  var count = 0;
  for (var i = 0; i < str.length; i++) {
    if (str.charAt(i) == char)
      count++;
  }
  return count;
}

console.log(countBs("BBC"));
console.log(countChar("kakkerlak", "k"));