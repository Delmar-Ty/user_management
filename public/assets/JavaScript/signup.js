const form = document.querySelector('.form');
const zip = document.querySelector('#zip');
const btn = document.querySelector('.btn');

const inputs = document.querySelectorAll('input');
const errors = [];

btn.addEventListener('click', () => {
    inputs.forEach((el) => {
        console.log(el);
    });
});