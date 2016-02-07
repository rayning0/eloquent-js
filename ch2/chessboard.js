var size = 8;
var board = '';

for (var y = 0; y < size; y++) {

  for (var x = 0; x < size; x++) {
    if ((x + y) % 2 == 0)
      board += ' ';
    else
      board += '#';
  }
  board += '\n';
}

/* 1st solution

for (var y = 0; y < size; y++) {
  var row = '';

  for (var x = 0; x < size; x++) {
    if (y % 2 == 0)
      if (x % 2 == 0)
        row += ' ';
      else
        row += '#';
    else
      if (x % 2 == 0)
        row += '#';
      else
        row += ' ';
  }
  row += '\n';
  board += row;
}

*/

console.log(board);