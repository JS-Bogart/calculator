const calculate = (input) => {

  const ops = {
    add: '+',
    sub: '-',
    div: '/',
    mlt: '*'
  };

  // Create array for Order of Operation and precedence
  ops.opOrder = [
    [
      [ops.mlt],
      [ops.div]
    ],
    [
      [ops.add],
      [ops.sub]
    ]
  ];

  const characterTest = input.replace(/[^0-9*\/()\-+.\s]/g, '');
  if (characterTest !== input) {
    return "Invalid Input"
  }

  input = input.replace(/[^0-9*\/()\-+.]/g, ''); // clean up unnecessary characters

  const evaluate = (a, op, b) => {
    a = a * 1;
    b = b * 1;
    switch (op) {
      case ops.add:
        return a + b;
        break;
      case ops.sub:
        return a - b;
        break;
      case ops.div:
        return a / b;
        break;
      case ops.mlt:
        return a * b;
        break;
      default:
        null;
    }
  }

  let output;
  
  for (let i = 0, n = ops.opOrder.length; i < n; i++) {

    // Regular Expression to look for operators between floating numbers or integers
    let re = new RegExp('(-?\\d+\\.?\\d*)([\\' + ops.opOrder[i].join('\\') + '])(-?\\d+\\.?\\d*)');
    re.lastIndex = 0; // take precautions and reset re starting pos

    // Loop while there is still calculation for level of precedence
    while (re.test(input)) {
      output = evaluate(RegExp.$1, RegExp.$2, RegExp.$3);
      if (isNaN(output) || !isFinite(output))
        return output; // exit early if not a number
      input = input.replace(re, output);
    }
  }

  return output;
}