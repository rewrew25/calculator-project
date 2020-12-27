const display = document.querySelector('.display');
let displayValue = '0';
let firstNum = null;
let secondNum = null;
let firstOperator = null;
let secondOperator = null;
let result = null;
const buttons = document.querySelectorAll('button');

function changeDisplay() {
	display.textContent = displayValue;
	if(displayValue.length > 9) {
		display.textContent = displayValue.substring(0, 9);
	};
};

changeDisplay();

function clickButton() {
	for(let i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', () => {
			if(buttons[i].classList.contains('num')) {
				inputNum(buttons[i].value);
				changeDisplay();
			} else if (buttons[i].classList.contains('operator')) {
				inputOperator(buttons[i].value);
			} else if (buttons[i].classList.contains('equals')) {
				inputEquals();
				changeDisplay();
			} else if (buttons[i].classList.contains('clear')) {
				clearDisplay();
				changeDisplay();
			} else if (buttons[i].classList.contains('percent')) {
				inputPercent(displayValue);
				changeDisplay();
			} else if (buttons[i].classList.contains('sign')) {
				inputSign(displayValue);
				changeDisplay();
			} else if (buttons[i].classList.contains('decimal')) {
				inputDecimal(buttons[i].value);
				changeDisplay();
			};
		});
	};
};

clickButton();

function inputNum(operand) {
	if(firstNum === null) {
		if(displayValue === '0' || displayValue === 0) {
			displayValue = operand;
		} else if(displayValue === firstNum) {
			displayValue = operand;
		} else {
			displayValue += operand;
		}
	} else {
		if(displayValue === firstNum) {
			displayValue = operand;
		} else {
			displayValue += operand;
		};
	};
};

function inputOperator(operator) {
	//updates result after first operator and second Num are entered
	if(firstOperator != null && secondOperator === null) {
		secondOperator = operator;
		secondNum = displayValue;
		result = operate(Number(firstNum), Number(secondNum), firstOperator);
		displayValue = makeAccurate(result, 10).toString();
		firstNum = displayValue;
		result = null;
		//updates result with two operators and multiple num inputs
	} else if (firstOperator != null && secondOperator != null) {
		secondNum = displayValue;
		result = operate(Number(firstNum), Number(secondNum), secondOperator);
		secondOperator = operator;
		displayValue = makeAccurate(result, 10).toString();
		firstNum = displayValue;
		result = null;
		//updates operator when first selected
	} else {
		firstOperator = operator;
		firstNum = displayValue;
	};
};

function inputEquals() {
	//prevents "undefined" before operate function
	if(firstOperator === null) {
		displayValue = displayValue;
	} else if (secondOperator != null) {
		//initiates the final result of all input numbers & operations
		secondNum = displayValue;
		result = operate(Number(firstNum), Number(secondNum), secondOperator);
		if (result === 'nope') {
			displayValue = 'nope';
		} else {
			//allows displayValue to update to current results and allows further calculating
			displayValue = makeAccurate(result, 10).toString();
			firstNum = displayValue;
			secondNum = null;
			firstOperator = null;
			secondOperator = null;
			result = null;
		}
	} else {
		// calculates first operation
		secondNum = displayValue;
		result = operate(Number(firstNum), Number(secondNum), firstOperator);
		if (result === 'nope') {
			displayValue = 'nope';
		} else {
			displayValue = makeAccurate(result, 10).toString();
			firstNum = displayValue;
			secondNum = null;
			firstOperator = null;
			secondOperator = null;
			result = null;
		};
	};
};
function add(a, b) {
	return a + b;  
};
function subtract(a, b) {
	return a - b;
};
function multiply(a, b) {
	return a * b;
};
function divide(a, b) {
	return a / b;
};
function operate(a, b, operator) {
	let answer;
	if (operator === '+') {
		answer = add(a, b);
	} else if (operator === '-') {
		answer = subtract(a, b);	
	} else if (operator === '*') {
		answer = multiply(a, b);
	} else if (operator === '/') {
		if (b === 0) {
			answer = 'nope';
		} else {
		answer = divide(a, b);
		};	
	};
	return answer
};

function inputSign(num) {
    displayValue = (num * -1).toString();
};
function inputDecimal(point) {
    if(displayValue === firstNum || displayValue === secondNum) {
        displayValue = '0';
        displayValue += point;
    } else if(!displayValue.includes(point)) {
        displayValue += point;
    }; 
};
function inputPercent(num) {
    displayValue = (num/100).toString();
};
function makeAccurate(num, maxPlaces) {
	return parseFloat(Math.round(num + 'e' + maxPlaces) + 'e-' + maxPlaces);
};
function clearDisplay() {
	displayValue = '0';
	firstNum = null;
	secondNum = null;
	firstOperator = null;
	secondOperator = null;
	result = null;
};









