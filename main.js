const numbers = document.querySelectorAll(".data-number");
const operations = document.querySelectorAll(".data-operation");
const equal = document.querySelector("#data-equals");
const deleteBtn = document.querySelector("#data-delete");
const allClear = document.querySelector("#data-all-Clear");
const previousOperandText = document.querySelector("#data-previous-operand");
const currentOperandText = document.querySelector("#data-current-operand");

let firstNum = "";
let nextNum = null;
let operation = "";
let shouldResetNum = false;

function operate(firstNum, nextNum, operation) {
  firstNum = Number(firstNum);
  nextNum = Number(nextNum);

  switch (operation) {
    case "+":
      return firstNum + nextNum;
    case "-":
      return firstNum - nextNum;
    case "✖":
      return firstNum * nextNum;
    case "÷":
      return nextNum !== 0 ? firstNum / nextNum : "Error";
    default:
      return nextNum;
  }
}

function appendNumber(number) {
  if (previousOperandText.textContent.length >= 21) return;
  if (shouldResetNum) {
    previousOperandText.textContent = "";
    shouldResetNum = false;
  }
  previousOperandText.textContent += number;
}

function chooseOperation(operator) {
  if (operation !== "") calculate();
  firstNum = previousOperandText.textContent;
  operation = operator;
  currentOperandText.textContent = `${firstNum} ${operation}`;
  shouldResetNum = true;
}

function calculate() {
  if (operation === "" || shouldResetNum) return;
  nextNum = previousOperandText.textContent;
  const result = operate(firstNum, nextNum, operation);
  previousOperandText.textContent = result;
  currentOperandText.textContent = `${firstNum} ${operation} ${nextNum} = ${result}`;
  operation = "";
  shouldResetNum = true;
}

function clear() {
  previousOperandText.textContent = "";
  currentOperandText.textContent = "";
  firstNum = "";
  nextNum = null;
  operation = "";
  shouldResetNum = false;
}

function deleteNumber() {
  previousOperandText.textContent = previousOperandText.textContent.slice(
    0,
    -1
  );
}

// Event Listeners
numbers.forEach((button) =>
  button.addEventListener("click", () => appendNumber(button.textContent))
);

operations.forEach((button) =>
  button.addEventListener("click", () => chooseOperation(button.textContent))
);

equal.addEventListener("click", calculate);
allClear.addEventListener("click", clear);
deleteBtn.addEventListener("click", deleteNumber);
