const operators = {
  add: (num, num2) => {
    let sum = num + num2;
    calculatorMemory.digitsInputted = sum;
    updateDisplay();
  },
  subtract: (num, num2) => {},
  multiply: (num, num2) => {},
  divide: (num, num2) => {},
};

const decideOperation = (operator, num, num2) => {
  switch (operator) {
    case "+":
      operators.add(num, num2);
      break;

    default:
      break;
  }
};

const calculatorMemory = {
  digitsInputted: "0",

  currentOperand: "",
  currentOperator: "",
  nextOperand: "",
};

const btnsClicked = () => {
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
    if (e.target.classList.contains("btn-equals")) {
      let operator = e.target.value;
      inputEquals();
    }
    if (e.target.classList.contains("btn-clear")) {
      clearMemory();
    }
  });
};
btnsClicked();

const inputDigit = (digit) => {
  //just destructures the prop
  let { digitsInputted } = calculatorMemory;
  //try ternary
  if (digitsInputted === "0") {
    digitsInputted = digit;
  } else {
    digitsInputted += digit;
  }
  calculatorMemory.digitsInputted = digitsInputted;

  updateDisplay();
};

const inputOperator = (operator) => {
  if (calculatorMemory.operator !== "") {
  }
  calculatorMemory.currentOperator = operator;
  calculatorMemory.currentOperand = calculatorMemory.digitsInputted;
  calculatorMemory.digitsInputted = "";
};

const inputEquals = () => {
  let { currentOperand, currentOperator, nextOperand } = calculatorMemory;
  calculatorMemory.nextOperand = calculatorMemory.digitsInputted;
  calculatorMemory.digitsInputted = "";

  decideOperation(
    currentOperator,
    parseFloat(currentOperand),
    parseFloat(calculatorMemory.nextOperand)
  );
};

const clearMemory = () => {
  calculatorMemory.digitsInputted = "0";
  calculatorMemory.currentOperand = "";
  calculatorMemory.currentOperator = "";
  calculatorMemory.nextOperand = "";
  updateDisplay();
};

const updateDisplay = () => {
  const calculatorDisplay = document.querySelector(".calculator-display");
  calculatorDisplay.value = calculatorMemory.digitsInputted;
};
