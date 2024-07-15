'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const display = document.querySelector('.display'),
        btns = document.querySelector('.buttons'),
        equals = document.querySelector('#equals'),
        clear = document.querySelector('#clear'),
        backspace = document.querySelector('#backspace'),
        backAction = document.querySelector('#back_action'),
        percent = document.querySelector('#percent'),
        allOperations = document.querySelector('.calculator__operations'),
        listAllOperations = document.querySelector('.list__operations'),
        closer = document.querySelector('.page-down');

    const arithmetic = document.querySelectorAll('.arithmetic');

    let operation = JSON.parse(localStorage.getItem('operations')) || [];
    let filteredArr = [];

    const updateLocalStorage = () => {
        localStorage.setItem('operations', JSON.stringify(operation));
    };

    btns.addEventListener('click', (event) => {
        if (event.target.classList.contains('number') || event.target.classList.contains('arithmetic')) {
            const lastChar = display.innerHTML[display.innerHTML.length - 2];
            const currentChar = event.target.innerHTML;

            if (display.innerHTML == 0 && !event.target.classList.contains('arithmetic')) {
                display.innerHTML = `${currentChar}`;
            } else {
                if (event.target.classList.contains('arithmetic')) {
                    if (['+', '-', '*', '/'].includes(lastChar) || event.target.classList.contains('number')) {
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

    // Очищаем строку для ввода
    clear.addEventListener('click', (event) => {
        display.innerHTML = '0';
    });

    // Действия после нажатия на равно "="
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
                console.log(numberAfterProcent);
                break;
            }
        }

        display.innerHTML = eval(expression);

        // добавление примера в массив
        operation.push(`${expression} = ${eval(expression)}`);
        updateLocalStorage();

        // проверка и удаление ненужных примеров в массиве
        operation = operation.filter(item => item.includes('%') || item.includes('+') || item.includes('-') || item.includes('*') || item.includes('/'));
        console.log(operation);
    });

    // Все операции, которые были ранее
    backAction.addEventListener('click', () => {
        // сортировка массива operation с пустыми элементами
        filteredArr = operation.filter(item => item);
        allOperations.classList.remove('disactive');
        allOperations.classList.add('active');

        listAllOperations.innerHTML = '';

        filteredArr.forEach((item, index, arr) => {
            const li = document.createElement('li');
            li.classList.add('operation');
            li.innerHTML = `<span>${item}</span>\n`;
            listAllOperations.append(li);
        });

        console.log(operation);
        console.log(filteredArr);
    });

    closer.addEventListener('click', () => {
        allOperations.classList.add('disactive');
        allOperations.classList.remove('active');
    });

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
})