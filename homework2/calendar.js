'use strict';
const dayInString = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthInString = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const CELLS = 42;
const TODAY = new Date();
let year, month, date;

function init() {
    year = TODAY.getFullYear();
    month = TODAY.getMonth();
    date = TODAY.getDate();
}
init();

const todayEl = document.querySelector('.today');
todayEl.textContent = `${dayInString[getDay(year, month, date)]}, ${monthInString[month]} ${date}`;

const monthYearEl = document.querySelector('.current-month-year');
monthYearEl.textContent = `${monthInString[month]} ${year}`;
renderCalendar();

document.querySelector('.calendar-display .prev').addEventListener('click', () => {
    year = month === 0 ? year - 1 : year;
    month = month === 0 ? 11 : month - 1;
    renderCalendar();
});

document.querySelector('.calendar-display .next').addEventListener('click', () => {
    year = month === 11 ? year + 1 : year;
    month = (month + 1) % 12;
    renderCalendar();
});

//Month Picking
const monthPickingEl = document.querySelector('.month-picking');
renderMonth();
monthYearEl.addEventListener('click', () => {
    monthPickingEl.classList.add('show');
    monthPickingEl.classList.remove('hide');
});

monthPickingEl.querySelector('.prev').addEventListener('click', () => {
    year--;
    renderCalendar();
    renderMonth();
});

monthPickingEl.querySelector('.next').addEventListener('click', () => {
    year++;
    renderCalendar();
    renderMonth();
});

monthPickingEl.querySelector('.months').addEventListener('click', function (e) {
    if (e.target.closest('.month')) {
        const target = e.target.closest('.month');
        year = Number(target.dataset.year);
        month = Number(target.dataset.month);
        renderCalendar();
        renderMonth();
        monthPickingEl.classList.add('hide');
        monthPickingEl.classList.remove('show');
    }
    return;
});

//Year Picking
const yearPickingEl = document.querySelector('.year-picking');
renderYear(year);

let temp = year;
yearPickingEl.querySelector('.prev').addEventListener('click', () => {
    temp -= 10;
    renderYear(temp);
});

yearPickingEl.querySelector('.next').addEventListener('click', () => {
    temp += 10;
    renderYear(temp);
});

yearPickingEl.querySelector('.years').addEventListener('click', function (e) {
    if (e.target.closest('.year')) {
        const target = e.target.closest('.year');
        year = Number(target.dataset.year);
        renderCalendar();
        renderMonth();
        renderYear(year);
        monthPickingEl.classList.add('show');
        monthPickingEl.classList.remove('hide');
        yearPickingEl.classList.add('hide');
        yearPickingEl.classList.remove('show');
    }
    return;
});

monthPickingEl.querySelector('.current-year').addEventListener('click', () => {
    yearPickingEl.classList.add('show');
    yearPickingEl.classList.remove('hide');
    monthPickingEl.classList.add('hide');
    monthPickingEl.classList.remove('show');
});

todayEl.addEventListener('click', reset);

function getDay(year, month, date) {
    return new Date(year, month, date).getDay();
}

function renderCalendar() {
    const numDates = new Date(year, month + 1, 0).getDate();
    let htmlDates = '';
    //Offset-top
    const lastDateOfPreviousMonth = new Date(year, month, 0).getDate();
    const firstDay = getDay(year, month, 1);
    for (let i = lastDateOfPreviousMonth - firstDay + 1; i <= lastDateOfPreviousMonth; i++) {
        htmlDates += `<div class="date date--offset">${i}</div>`;
    }

    //Current month
    let isActive = false;
    for (let i = 1; i <= numDates; i++) {
        isActive = i === date && month === TODAY.getMonth() && year === TODAY.getFullYear();
        htmlDates += `<div class="date ${isActive ? 'active' : ''}">${i}</div>`;
    }

    //Offset-bottom
    const offset = CELLS - numDates - firstDay;
    for (let i = 1; i <= offset; i++) {
        htmlDates += `<div class="date date--offset">${i}</div>`;
    }

    monthYearEl.textContent = `${monthInString[month]} ${year}`;
    document.querySelector('.dates').innerHTML = htmlDates;
}

function renderMonth() {
    let htmlMonths = '';
    let isActive = false;
    for (let i = 0; i < 12; i++) {
        isActive = i === TODAY.getMonth() && year === TODAY.getFullYear();
        htmlMonths += `<div class="month ${isActive ? 'active' : ''}" data-month="${i}" data-year="${year}">${monthInString[i].slice(0, 3)}</div>`;
    }

    //Offset-bottom
    for (let i = 0; i < 4; i++) {
        htmlMonths += `<div class="month month--offset" data-month="${i}" data-year="${year + 1}">${monthInString[i].slice(0, 3)}</div>`;
    }
    monthPickingEl.querySelector('.current-year').textContent = year;
    document.querySelector('.months').innerHTML = htmlMonths;
}

function renderYear(year) {
    const MIN = year - (year % 10);
    const MAX = MIN + 9;

    let htmlYears = '';
    let isActive = false;
    for (let i = MIN; i <= MAX; i++) {
        isActive = i === TODAY.getFullYear();
        htmlYears += `<div class="year ${isActive ? 'active' : ''}" data-year="${i}">${i}</div>`;
    }
    yearPickingEl.querySelector('.current-year-period').textContent = `${MIN} - ${MAX}`;
    document.querySelector('.years').innerHTML = htmlYears;
}

function reset() {
    init();
    renderCalendar();
    renderMonth();
    renderYear(year);
    yearPickingEl.classList.add('hide');
    yearPickingEl.classList.remove('show');
    monthPickingEl.classList.add('hide');
    monthPickingEl.classList.remove('show');
}
