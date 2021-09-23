const calculate = (input) => {

  let output;

  //Displays message if no input is entered
  if (input.length < 1) {
    return "Please enter an equation."
  }

  //separates operators by order of operations
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

  //Checks for any non-numerical or operator characters
  const characterTest = input.replace(/[^0-9*\/()\-+.\s]/g, '');
  if (characterTest !== input) {
    return "Invalid Input";
  }

  //removes white spaces
  input = input.replace(/[^0-9*\/()\-+.]/g, '');

  //checks for correct operator syntax, and validates presence of integers
  const opTest1 = /(\+|-|\*|\/)(\+|\*|\/)/
  const opTest2 = /^(\+|\*|\/)/
  const opTest3 = /(\+|-|\*|\/)$/
  const NumCheck = /(d*)/
  if (opTest1.test(input) 
    || opTest2.test(input) 
    || opTest3.test(input)
    || !NumCheck.test(input)
    ) {
    return "Syntax Error";
  }

  //recursively solves any expressions contained within parentheses first
  const para = new RegExp('([(])(.*)([)])')
  while (para.test(input)) {
    output = calculate(RegExp.$2);
    //Displays message if input contains 0 as denominator
    if (!isFinite(output))
      return "Do not divide by zero!";
    input = input.replace(para, output);
  }
  
  //iterates over array of operators
  for (let i = 0; i < opOrder.length; i++) {

    //Captures simple expressions with single operators (not including '-' 
    //following another operator)
    let exp = new RegExp('(-?\\.?\\d+\\.?\\d*)([\\' + opOrder[i].join('\\') + '])(-?\\.?\\d+\\.?\\d*)');
    exp.lastIndex = 0;

    //continues loop while there are still expressions to calculate
    while (exp.test(input)) {
      output = evaluate(RegExp.$1, RegExp.$2, RegExp.$3);
      if (!isFinite(output))
        return "Do not divide by zero!";
      input = input.replace(exp, output);
    }
  }

  //sets output to input in case of only a single number being entered as input
  output = input;

  return output;
}

//helper function to calculate small expressions
const evaluate = (a, op, b) => {
  a = a * 1;
  b = b * 1;
  switch (op) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '/':
      return a / b;
    case '*':
      return a * b;
    default:
      null;
  }
}