const operators = {
  add: (num, num2) => {
    console.log(num + num2);
  },
  subtract: (num, num2) => {},
  multiply: (num, num2) => {},
  divide: (num, num2) => {},
};

const operate = (operator, num, num2) => {
  switch (operator) {
    case "+":
      operators.add(num, num2);
      break;

    default:
      break;
  }
};

operate("+", 23, 34);

const calculatorMemory = {
  digitsToDisplay: "0",
};

const btnsClicked = () => {
  const calculatorBtns = document.querySelector(".calculator-btns");
  calculatorBtns.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-digit")) {
      let digit = e.target.value;
      inputDigit(digit);
    }
  });
};
btnsClicked();

const inputDigit = (digit) => {
  debugger;
  let { digitsToDisplay } = calculatorMemory;
  if (digitsToDisplay === "0") {
    digitsToDisplay = digit;
  } else {
    digitsToDisplay = digitsToDisplay + digit;
  }

  updateDisplay();
};

const updateDisplay = () => {
  let { digitsToDisplay } = calculatorMemory;
  const calculatorDisplay = document.querySelector(".calculator-display");
  calculatorDisplay.value = digitsToDisplay;

  // const calculatorDisplay = document.querySelector(".calculator-display");
  // calculatorDisplay.value = digitsToDisplay;
};
