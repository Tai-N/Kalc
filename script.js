function operate(operand1, operator, operand2) {
  switch (operator) {
    case "+":
      return operand1 + operand2;
    case "-":
      return operand1 - operand2;
    case "*":
      return operand1 * operand2;
    case "/":
      return operand1 / operand2;
  }
}

function btnsClicked() {
  const calcBtns = document.querySelector(".calc-btns");
  calcBtns.addEventListener("click", (e) => {
    // get user digit input
    if (e.target.classList.contains("btn-digit")) {
      let digit = e.target.value;
      enterDigit(digit);
    }
    if (e.target.classList.contains("btn-clear")) {
      clear();
    }
    if (e.target.classList.contains("btn-decimal")) {
      let dot = e.target.value;
      enterDecimal(dot);
    }
    if (e.target.classList.contains("btn-operator")) {
      let operator = e.target.value;
      enterOperator(operator);
    }
    if (e.target.classList.contains("btn-equals")) {
      clickEquals();
    }
  });
}
btnsClicked();

const memory = {
  // buffer stores digits string; its value will also be set to value attrib of screen and to operands as needed
  buffer: "0",

  //operands will be stored as actual number, NOT string
  operand1: null,
  operator: null,
  operand2: null,

  expectingOperand2: false,
};

// create fn to handle entered digits
function enterDigit(digitEntered) {
  //every finished entered number is stored in a memory.buffer

  // if 0 is present as value in buffer, and 0 is entered as 1st digit...
  if (memory.buffer === "0" && digitEntered === "0") {
    return;
  }
  // if 0 is present as value in buffer, and non zero digit is entered 1st...
  if (memory.buffer === "0" && digitEntered != "0") {
    memory.buffer = digitEntered;
    updateScreen();
    return;
  }

  // else, continue adding to digits STRING
  memory.buffer += digitEntered;

  updateScreen();
}

function enterDecimal(dot) {
  // if there's already a dot in the digit string in buffer and dot is entered..
  if (memory.buffer.includes(".")) {
    return;
  } else {
    // concatenate dot to digit string
    memory.buffer += dot;
  }

  updateScreen();
}

// store the first number that is inputted into the calculator when a user presses an operator
function enterOperator(operatorEntered) {
  //?When a user enters two or more operators consecutively, you should be able to hit - to override the + that was previously entered. 1 + 2 +- 3
  // if (condition) {
  //   memory.operator = operatorEntered;
  //   return;
  // }

  // Users should be able to string together several operations: 1 + 2 + 3 etc
  // check if another operator already exists when we enter a new operator, perform operation, then display on screen;
  if (memory.operator) {
    let operand2 = parseFloat(memory.buffer);
    let result = operate(memory.operand1, memory.operator, operand2);
    memory.buffer = result;
    updateScreen();
  }

  const { buffer } = memory;
  // set current value in buffer to operand1
  memory.operand1 = parseFloat(buffer);
  memory.buffer = "0";
  //save operator chosen
  memory.operator = operatorEntered;
  // memory.expectingOperand2 = true;
}

function clickEquals() {
  debugger;

  const { buffer, operator, operand1 } = memory;
  memory.operand2 = parseFloat(buffer);

  let result = operate(operand1, operator, memory.operand2);
  memory.buffer = result;

  updateScreen();
}
// fn to display value on screen
function updateScreen() {
  // html value attribute represents calc screen
  const screen = document.querySelector(".calc-screen");
  screen.value = memory.buffer;
}

function clear() {
  memory.buffer = "0";
  memory.operand1 = null;
  memory.operator = null;
  memory.operand2 = null;
  updateScreen();
}
