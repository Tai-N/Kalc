const calcBtns = document.querySelector(".calc-btns");

const calc = {
  displayValue: "0",
  firstOperand: null,
  operator: null,

  waitingForSecondOperand: false,
};

const inputDigit = (digit) => {
  const { displayValue } = calc;
  calc.displayValue = displayValue === "0" ? digit : displayValue + digit;
};

const inputDecimal = (dot) => {
  if (!calc.displayValue.includes(dot)) {
    calc.displayValue += dot;
  }
};

const handleOperator = (nextOperator) => {
  const { firstOperand, displayValue, operator } = calc;
};

function updateDisplay() {
  const display = document.querySelector(".calc-display");
  display.value = calc.displayValue;
}


const btnsClicked = () => {
  calcBtns.addEventListener("click", (event) => {
    const { target } = event;
    // for unrelated conditions, don't use nested if else
    // matches() checks if the element "is" the selector
    if (!target.matches(".calc-btn")) {
      console.log("not a btn");
      return;
    }

    if (target.classList.contains("btn-opr")) {
      console.log("operator", target.value);
      return;
    }
    if (target.classList.contains("btn-decimal")) {
      inputDecimal(target.value);
      updateDisplay();
      return;
    }
    if (target.classList.contains("btn-clear")) {
    }

    inputDigit(target.value);
    updateDisplay();
  });
};

btnsClicked();
updateDisplay();
