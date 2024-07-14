'use strict';

const display = document.querySelector('.display'),
    btns = document.querySelector('.buttons'),
    equals = document.querySelector('#equals'),
    clear = document.querySelector('#clear'),
    backspace = document.querySelector('#backspace'),
    backAction = document.querySelector('#back_action');

let operation = [];
let filteredArr = [];


const arithmetic = document.querySelectorAll('.arithmetic');

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
    expression = expression.replace(/(\d+)%/g, (match, p1) => {
        return `${p1}/100`;
    });

    display.innerHTML = eval(expression);
    operation.push(`${expression} = ${eval(expression)}`);

    operation.forEach((item, index, arr) => {
        for (let i = 0; i < item.length; i++) {
            if (item.includes('+') || item.includes('-') || item.includes('*') || item.includes('/')) {
            } else {
                delete arr[index]
            }
        }
    })
    console.log(operation)
});


// Все операции, которые были раннее
backAction.addEventListener('click', () => {

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