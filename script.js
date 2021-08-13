// CLASS CALCULATOR FOR DOM
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateCurrentOperand(data) {
        this.currentOperand = data;
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }

    compute() {
        const prev = this.previousOperand;
        const current = this.currentOperand;
        let arr = [current.toString(), this.operation, prev.toString()];

        this.previousOperand = ''
        this.operation = undefined

        return arr;
    }
}

// SELECT ELEMENT
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// INSTANCE CLASS CALCULATOR
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay()
    })
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

// DISINI PROSES ITUNG"AN
equalsButton.addEventListener('click', button => {
    let arr = calculator.compute()
    console.log(arr);
    const ajax = new XMLHttpRequest();
    ajax.onload = () => {
        const data = ajax.response
        calculator.updateCurrentOperand(data)
        calculator.updateDisplay()
    }

    // SET URL UNTUK MENGAKSES FUNCTION PADA PHP
    let url = undefined;
    if (arr[1] == "-") {
        url = `Function.php?subt=${arr[0]},${arr[1]},${arr[2]}`
    } else if (arr[1] == "+") {
        url = `Function.php?add=${arr[0]},%2B,${arr[2]}`
    } else if (arr[1] == "*") {
        url = `Function.php?mult=${arr[0]},*,${arr[2]}`
    } else if (arr[1] == "/") {
        url = `Function.php?div=${arr[0]},/,${arr[2]}`
    }
    ajax.open('GET', url);
    ajax.send();
})