'use strict'
// ************************************ General Constants ************************************ //
//********************************************************************************************//
const Display = document.getElementById('Display');
const Number = document.querySelectorAll('[id*=Key]');
const Operators = document.querySelectorAll('[id*=Operator]');


//************************************ Display actions ************************************ //
//*****************************************************************************************//
const refreshDisplay = (text) => {
    if (newNumber) {
        Display.textContent = text.toLocaleString('Br');
        newNumber = false;
    } else {
        Display.textContent += text;
    }
}

const insertNumber = (Event) => refreshDisplay(Event.target.textContent);

const ClearDisplay = () => {
    Display.textContent = '';
}
document.getElementById('ClearDisplay').addEventListener('click', ClearDisplay);

const Clear = () => {
    ClearDisplay()
    Operator = undefined;
    newNumber = true;
    beforeNumber = undefined;
}

document.getElementById('Clear').addEventListener('click', Clear);

const Backspace = () => {
    Display.textContent = Display.textContent.slice(0, -1)
}

//************************************ Calculate actions ************************************//
//******************************************************************************************//
let newNumber = true;
let Operator;
let beforeNumber;

const operationPending = () => Operator != undefined;

const calculate = () => {
    if (operationPending()) {
        const currentNumber = parseFloat(Display.textContent.replace(',', '.'));
        newNumber = true;
        if (Operator == '+') {
            refreshDisplay(beforeNumber + currentNumber);
        } else if (Operator == '-') {
            refreshDisplay(beforeNumber - currentNumber);
        } else if (Operator == '/') {
            refreshDisplay(beforeNumber / currentNumber);
        } else if (Operator == '*') {
            refreshDisplay(beforeNumber * currentNumber);
        }
        console.log(Operator)
    }
}

const selectOperator = (Event) => {
    if (!newNumber) {
        calculate();
        newNumber = true;
        Operator = Event.target.textContent;
        beforeNumber = parseFloat(Display.textContent.replace(',', '.'));
    }
};

Number.forEach(Number => Number.addEventListener('click', insertNumber));

Operators.forEach(Operators => Operators.addEventListener('click', selectOperator));

const activeEqual = () => {
    calculate();
    Operator = undefined;
}

document.getElementById('Equal').addEventListener('click', activeEqual)

document.getElementById('Backspace').addEventListener('click', Backspace)
const invertOperator = () => {
    newNumber = true;
    refreshDisplay(Display.textContent * -1);
}

document.getElementById('OperatorPlusMinus').addEventListener('click', invertOperator)

//************************************ Decimal Actions ************************************//
//****************************************************************************************//
const haveDecimal = () => Display.textContent.indexOf(',') != -1;
const haveNumber = () => Display.textContent.length > 0;

const insertComma = () => {
    if (!haveDecimal()) {
        if (haveNumber()) {
            refreshDisplay(',');
        } else {
            refreshDisplay('0,');
        }
    }
}

document.getElementById('Comma').addEventListener('click', insertComma);

//************************************ Keyboard Map ************************************//
//**************************************************************************************//
const keyMap = {
    '0': 'Key0',
    '1': 'Key1',
    '2': 'Key2',
    '3': 'Key3',
    '4': 'Key4',
    '5': 'Key5',
    '6': 'Key6',
    '7': 'Key7',
    '8': 'Key8',
    '9': 'Key9',
    '/': 'OperatorDivide',
    '*': 'OperatorMultiply',
    '-': 'OperatorMinus',
    '+': 'OperatorPlus',
    '=': 'Equal',
    'Enter': 'Equal',
    'Backspace': 'Backspace',
    'Delete': 'Clear',
    'Escape': 'ClearDisplay',
    ',': 'Comma'
}

const mapKeyboard = (Event) => {

    const NumberKey = Event.key;
    const useKey = () => Object.keys(keyMap).indexOf(NumberKey) != -1;
    if (useKey()) document.getElementById(keyMap[NumberKey]).click();
}

document.addEventListener('keydown', mapKeyboard);

