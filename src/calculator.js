const calculate = (input) => {

  let output;

  const opOrder = [
    [
      ['*'],
      ['/']
    ],
    [
      ['+'],
      ['-']
    ]
  ];

  const characterTest = input.replace(/[^0-9*\/()\-+.\s]/g, '');
  if (characterTest !== input) {
    return "Invalid Input";
  }

  input = input.replace(/[^0-9*\/()\-+.]/g, '');

  const opTest1 = /(\+|-|\*|\/)(\+|\*|\/)/
  const opTest2 = /^(\+|-|\*|\/)/
  const opTest3 = /(\+|-|\*|\/)$/
  const opNumCheck = /(\+|-|\*|\/d*)/
  if (opTest1.test(input) 
    || opTest2.test(input) 
    || opTest3.test(input)
    || !opNumCheck.test(input)
    ) {
    return "Syntax Error";
  }

  const para = new RegExp('([(])(.*)([)])')
  while (para.test(input)) {
    output = calculate(RegExp.$2);
    if (isNaN(output) || !isFinite(output))
      return "Syntax Error";
    input = input.replace(para, output);
  }
  
  for (let i = 0; i < opOrder.length; i++) {
    let exp = new RegExp('(-?\\.?\\d+\\.?\\d*)([\\' + opOrder[i].join('\\') + '])(-?\\.?\\d+\\.?\\d*)');
    exp.lastIndex = 0;

    while (exp.test(input)) {
      output = evaluate(RegExp.$1, RegExp.$2, RegExp.$3);
      if (!isFinite(output))
        return "Do not divide by zero!";
      input = input.replace(exp, output);
    }
  }

  return output;
}

const evaluate = (a, op, b) => {
  a = a * 1;
  b = b * 1;
  switch (op) {
    case '+':
      return a + b;
      break;
    case '-':
      return a - b;
      break;
    case '/':
      return a / b;
      break;
    case '*':
      return a * b;
      break;
    default:
      null;
  }
}