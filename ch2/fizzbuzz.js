for (var i = 1; i <= 100; i++) {
  var result = '';
  if (i % 3 == 0)
    result += 'fizz';
  if (i % 5 == 0)
    result += 'buzz';

// 'a || b' means it usually returns a. If a == '', it returns b
  console.log(result || i);
}

/* Output

1
2
fizz
4
buzz
fizz
7
8
fizz
buzz
11
fizz
13
14
fizzbuzz
16
17
fizz
19
buzz
fizz
22
23
fizz
buzz
26
fizz
28
29
fizzbuzz
etc...

*/