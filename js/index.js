//Commom variables
var expression = "";
var lastNumber = 0, currentNumber = "";
const maxLength = 15;
var definedOperator = "";

//Display UI
var displayValue = document.getElementById('displayValue');
var expressionValue = document.getElementById('expressionValue');

//Operators and Numbers
var numbers = document.getElementsByClassName('numbers');
var operators = document.getElementsByClassName('operators');




function addExpressionToExpressionDisplay() {
    if (String(expression) == "")
        expressionValue.innerHTML = "0";
    else
        expressionValue.innerHTML = expression;
}

function addNumberToDisplay() {
    if (!String(currentNumber) == "")
        displayValue.innerHTML = currentNumber;
    else
        displayValue.innerHTML = 0;

}

function addOperatorToExpression(operator) {
    if (String(expression).charAt(expression.length - 1) != operator) {
        expression += operator;
        addExpressionToExpressionDisplay();
    }

}

function addDecimalToExpression(decimal) {
    if (String(expression).length < maxLength && !String(expression).includes(decimal)) {
        expression += decimal;
        addExpressionToExpressionDisplay();
        addNumberToDisplay();
    }
}

function addNumberToExpression(number) {
    if (String(expression).length < maxLength) {
        expression += number;
        addExpressionToExpressionDisplay();
    }
}

function addNumber(number) {
    if (String(currentNumber).length < maxLength) {
        currentNumber += number;
        addNumberToExpression(number);
    }

}

function addDecimalToNumber(decimal) {
    if (!String(currentNumber).includes(decimal)) {
        currentNumber += decimal;
        addDecimalToExpression(decimal);
    }
}

function clearExpressionDisplay() {
    expressionValue.innerHTML = 0;
}

function clearOnlyDisplay() {
    displayValue.innerHTML = 0;
}

function clearDisplayAndValues() {
    currentNumber = "";
    expression = "";
    lastNumber = 0;
    numberB = 0;
    definedOperator = "";

    clearExpressionDisplay();
    clearOnlyDisplay();
}

function operator(operator) {

    switch (String(operator)) {
        case '.': {
            addDecimalToNumber(operator);
            addDecimalToExpression(operator);
            break;
        }
        case 'AC': {
            clearDisplayAndValues();
            break;
        }
        case '←': {
            currentNumber = String(currentNumber).slice(0, -1);
            expression = String(expression).slice(0, -1);
            addExpressionToExpressionDisplay();
            addNumberToDisplay();
            break;
        }

        case '×': {
            if (lastNumber == 0)
                lastNumber = 1;

            definedOperator = '*';
            lastNumber = Number(currentNumber) * lastNumber;
            currentNumber = lastNumber;
            addOperatorToExpression(operator);
            addNumberToDisplay();
            currentNumber = "";
            break;
        }

        case '-': {
            definedOperator = operator;

            if (currentNumber != 0)
                lastNumber -= Number(currentNumber);

            currentNumber = lastNumber;
            addOperatorToExpression(definedOperator);
            addNumberToDisplay();
            currentNumber = "";
            break;
        }

        case '+': {
            definedOperator = operator;
            lastNumber += Number(currentNumber);
            currentNumber = lastNumber;
            addOperatorToExpression(definedOperator);
            addNumberToDisplay();
            currentNumber = "";
            break;
        }
        case '÷': {
            definedOperator = '/';

            if (lastNumber == 0) // Evita a divisão por zero caso o número ainda não tenha valor válido.
                lastNumber = 1;

            if (lastNumber < Number(currentNumber))
                lastNumber = Number(currentNumber) / lastNumber;
            else
                lastNumber = lastNumber / Number(currentNumber);

            currentNumber = lastNumber;

            addOperatorToExpression(operator);
            addNumberToDisplay();
            currentNumber = "";
            break;
        }
        case '√': {
            currentNumber = Math.sqrt(Number(currentNumber));
            addOperatorToExpression(operator);
            addNumberToDisplay();
            currentNumber = "";
            break;
        }

        case '^': {
            definedOperator = '**';

            if (lastNumber == 0)
                lastNumber = Number(currentNumber);
            else
                lastNumber = lastNumber ** Number(currentNumber);

            currentNumber = lastNumber;
            addOperatorToExpression(operator);
            addNumberToDisplay();
            currentNumber = "";
            break;
        }
        case '=': {
            currentNumber = eval(`${Number(lastNumber)}${definedOperator}${Number(currentNumber)}`);
            addNumberToDisplay();
            break;
        }

    }
}

for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener('click', function (event) {
        operator(operators[i].value);
    });
}

for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', function (event) {
        addNumber(numbers[i].value);
        addNumberToDisplay();
    });
}
