import React, { useState } from 'react';
import './App.scss';

let firstValue = '';
let secondValue;
let currentOperator = '';
let prevOperator;

export default function App() {
    const [num, setNum] = useState(0);
    const handleResult = (result) => {
      setNum(result);
    };

    const buttons = ['AC', '%', '√', 'n*', '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '.', '0', '=', '+'];
    const operations = ['+', '-', '*', '/', 'n*', '%', '√'];

    const perfomOperations = (event) => {
        const currentTarget = event.target.textContent;
        if (currentTarget === 'AC') {
            firstValue = '';
            currentOperator = '';
            secondValue = '';
            handleResult(0)
        } else if (+currentTarget >= 0 && +currentTarget <= 9 || currentTarget === '.') { 
            if (firstValue === '0' && currentTarget === '0') {
                return handleResult(0)
            }   
            if (firstValue === '0' && currentTarget !== '.') {
                firstValue = currentTarget
                return handleResult(firstValue)
            }
            if (firstValue.includes('.') && currentTarget === '.') {
                return handleResult(firstValue)
            }
            firstValue += currentTarget;
            handleResult(firstValue);
        }

        operations.forEach(op => {
            if (currentTarget === op) {
                currentOperator = currentTarget;
                if (currentTarget !== '%' && currentTarget !== '√') {
                    prevOperator = currentTarget;
                    secondValue = firstValue;
                    firstValue = '';
                }
            }
        });

        if (currentTarget === '=') {
            const finalValue = calculate(currentOperator, +secondValue, +firstValue, prevOperator);
            currentOperator = '';
            secondValue = '';
            
            if (!isFinite(finalValue)) {
                handleResult('Error!');
            } else {
                handleResult(finalValue);
                firstValue = finalValue;
            }
        }
    }

    const calculate = (operator, num1, num2, prevOperator) => {
        switch (operator) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                return num1 / num2;
            case 'n*':
                return Math.pow(num1, num2);
            case '%':
                if (!num1) {
                    return num2 / 100;
                } else {
                    let res = num1 / 100;
                    res *= num2;
                    return calculate(prevOperator, num1, res);
                }
            case '√':
                if (!num1) {
                    return Math.sqrt(num2);
                } else {
                    let res = Math.sqrt(num2);
                    return calculate(prevOperator, num1, res);
                }
        }
    }

    return (
        <div className="Calculator">
            <div className='Wrapper'>
                <input type="text" className='Screen' value={num} readOnly/>
                {buttons.map((item) => (
                    <button key={item} className='Buttons' onClick={perfomOperations}>{item}</button>
                ))}
            </div>
        </div>
    );
}