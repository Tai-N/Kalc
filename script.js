function initiate() {
  const calculatorBtns = document.querySelector(".calculator-btns");
  calculatorBtns.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-digit")) {
      let digit = e.target.value;
      inputDigit(digit);
    }
    if (e.target.classList.contains("btn-operator")) {
      let operator = e.target.value;
      inputOperator(operator);
    }
    if (e.target.classList.contains("btn-clear")) {
      clearBtnClicked();
    }
    if (e.target.classList.contains("btn-decimal")) {
      decimalBtnClicked();
    }
  });
}
initiate();

const memory = {
  // represent user input or result of operation
  storage: "0",

  operand1: null,
  previousOperator: null,
  expectingOperand2: false,
};

function updateDisplay() {
  const display = document.querySelector(".calculator-display");

  display.value = memory.storage;
}

function inputDigit(digit) {
  const { storage, expectingOperand2 } = memory;

  if (expectingOperand2 === true) {
    memory.storage = digit;
    memory.expectingOperand2 = false;
  } else {
    memory.storage = storage === "0" ? digit : storage + digit;
  }

  updateDisplay();
}

function decimalBtnClicked() {
  if (!memory.storage.includes(".")) {
    memory.storage += ".";
  }
}

function inputOperator(operatorInputted) {
  const { storage, operand1, previousOperator } = memory;

  let numberInStorage = parseFloat(storage);

  if (previousOperator && memory.expectingOperand2) {
    memory.previousOperator = operatorInputted;
    return;
  }

  if (operand1 === null) {
    memory.operand1 = numberInStorage;
  }

  if (previousOperator || operatorInputted === "=") {
    let result = operate(previousOperator, operand1, numberInStorage);
    memory.storage = String(result);
    memory.operand1 = result;
    updateDisplay();
  }

  memory.previousOperator = operatorInputted;
  //shows 1st operand has been entered and 2nd one to be entered
  memory.expectingOperand2 = true;
}

function clearBtnClicked() {
  memory.storage = "0";
  memory.operand1 = null;
  memory.previousOperator = null;
  memory.expectingOperand2 = false;
  updateDisplay();
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return operations.add(a, b);
    case "-":
      return operations.subtract(a, b);
    case "*":
      return operations.multiply(a, b);
    case "/":
      return operations.divide(a, b);
    default:
      return "Error";
  }
}

const operations = {
  add(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  },
  multiply(a, b) {
    return a * b;
  },
  divide(a, b) {
    return a / b;
  },
};
