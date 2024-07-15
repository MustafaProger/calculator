'use strict';

const display = document.querySelector('.display'),
    btns = document.querySelector('.buttons'),
    equals = document.querySelector('#equals'),
    clear = document.querySelector('#clear'),
    backspace = document.querySelector('#backspace'),
    backAction = document.querySelector('#back_action'),
    percent = document.querySelector('#percent');

const arithmetic = document.querySelectorAll('.arithmetic');

let operation = [];
let filteredArr = [];

btns.addEventListener('click', (event) => {

    if (event.target.classList.contains('number') || event.target.classList.contains('arithmetic')) {
        const lastChar = display.innerHTML[display.innerHTML.length - 2];
        const currentChar = event.target.innerHTML;

        if (display.innerHTML == 0 && !event.target.classList.contains('arithmetic')) {
            display.innerHTML = `${currentChar}`;
        } else {
            if (event.target.classList.contains('arithmetic')) {
                if (['+', '-', '*', '/'].includes(lastChar)) {
                    display.innerHTML = display.innerHTML.slice(0, -2) + ` ${currentChar} `;
                } else {
                    display.innerHTML += ` ${currentChar} `;
                }
            } else {
                display.innerHTML += `${currentChar}`;
            }
        }
        display.scrollLeft = display.scrollWidth;
    }

});

// Очищаем строку для вода
clear.addEventListener('click', (event) => {
    display.innerHTML = '0';
});

// Действия, после нажатие на равно "="
equals.addEventListener('click', (event) => {
    let expression = display.innerHTML;

    // Работа с процентами
    for (let i = 0; i < expression.length; i++) {
        if (expression[i] == "%") {
            expression = `${expression.trim().slice(0, -1)} / 100`;
        } else if (['+', '-', '*', '/'].includes(expression[i]) && expression[expression.length - 1] == "%") {
            let numberForProcent = expression.slice(0, i);
            let numberAfterProcent = expression.slice(i + 2, -1);
            let procentNumber = numberForProcent / 100 * numberAfterProcent;

            expression = `${numberForProcent}${expression[i]} ${procentNumber}`;
            console.log(numberAfterProcent)
            break
            
        } else {
            console.log(false)

        }
    }

    display.innerHTML = eval(expression);

    // добавление примера в массив
    operation.push(`${expression} = ${eval(expression)}`);

    // проверка и удаление не нужных примеров в массив
    operation.forEach((item, index, arr) => {
        for (let i = 0; i < item.length; i++) {
            if (item.includes('%') || item.includes('+') || item.includes('-') || item.includes('*') || item.includes('/')) {
            } else {
                delete arr[index]
            }
        }
    })
    console.log(operation)
});

// Все операции, которые были раннее
backAction.addEventListener('click', () => {

    // сортировка массива operation с пустыми элементами
    for (let i = 0; i < operation.length; i++) {
        if (operation[i]) {
            filteredArr.push(operation[i]);
        }
    }

    console.log(filteredArr)
})

// Удаление предыдущего символа
backspace.addEventListener('click', (event) => {
    if (display.innerHTML.length == 1 && display.innerHTML != '0' || display.innerHTML == '0') {
        display.innerHTML = '0';
    } else {
        display.innerHTML = display.textContent.trim().slice(0, -1);
    }

});

// Удаление символа при нажатии на кнопку "Delete"
window.addEventListener('keydown', (event) => {
    if (event.code === 'Backspace' && display.innerHTML.length == 1) {
        display.innerHTML = '0';
    } else if (event.code === 'Backspace' && display.innerHTML.length >= 1) {
        display.innerHTML = display.textContent.trim().slice(0, -1);
    }
})