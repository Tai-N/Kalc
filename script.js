// perform an operation on operands and returns result
function operate(operator, operand1, operand2) {
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

// get value for each button when user clicked
//    create a DOM delegation event listener to determine which btn clicked
function btnsClicked() {
  // ? when qs selecting, use . or #
  const calcBtns = document.querySelector(".calc-btns");
  calcBtns.addEventListener("click", (e) => {
    // get user digit input
    //.classname returned all the classes
    if (e.target.classList.contains("btn-digit")) {
      // get value from html ele
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
  });
}
btnsClicked();

const memory = {
  // this value will be displayed on the screen
  storage: "0",
  //store all our operands as items in an array
  runningBuffer: [],
  //store converted actual number values, not strings
  operand1: null,
  operator: null,
  operand2: null,
};

// create fn to handle entered digits
function enterDigit(digitEntered) {
  //store these digits in a memory
  // if 0 is present as value in storage, and 0 is entered as 1st digit...
  if (memory.storage === "0" && digitEntered === "0") {
    return;
  }
  // if 0 is present as value in storage, and non zero digit is entered 1st...
  if (memory.storage === "0" && digitEntered != "0") {
    memory.storage = digitEntered;
    updateScreen();
    return;
  }

  // else, continue adding to digit string
  memory.storage += digitEntered;

  updateScreen();
}

function enterDecimal(dot) {
  // if there's already a dot in the digit string in storage and dot is entered..
  if (memory.storage.includes(".")) {
    return;
  }

  if (memory.storage === "0") {
    memory.storage = dot;
  } else {
    // concatenate dot to digit string
    memory.storage += dot;
  }

  updateScreen();
}

// fn to display value on screen
function updateScreen() {
  // html value attribute represents calc screen
  const screen = document.querySelector(".calc-screen");
  screen.value = memory.storage;
}

function clear() {
  memory.storage = "0";
  updateScreen();
}
