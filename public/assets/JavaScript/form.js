const form = document.querySelector('.form');
const zip = document.querySelector('#zip');
const btn = document.querySelector('.btn');
const pass = document.querySelectorAll('input[type="password"]');
const state = document.querySelector('input[name="state"]');
const email = document.querySelector('input[name="email"]');
const username = document.querySelector('input[name="username"]');

const inputs = document.querySelectorAll('input');

const stateReg = /\W|\d/g;
const emailReg = /(\w+@)(\w+)([-\.]\w+)?\.(org|net|com)/;
const usernameReg = /\W/g;

btn.addEventListener('click', () => {
    let errCount = 0;
    btn.setAttribute('style', '--msg: "";');
    inputs.forEach((el) => {
        if (!el.value) {
            errCount++;
        }
    });
    if (pass[0].value !== pass[1].value) {
        btn.setAttribute('style', '--msg: "Passwords Do Not Match";');
        errCount++;
    } else if (zip.value.length !== 5 && errCount <= 1) {
        btn.setAttribute('style', '--msg: "Invalid Zip Code";');
        errCount++;
    } else if (state.value.match(stateReg)) {
        btn.setAttribute('style', '--msg: "Invalid State";');
        console.log('Invalid State');
        errCount++;
    } else if (!email.value.match(emailReg)) {
        btn.setAttribute('style', '--msg: "Invalid Email";');
        errCount++;
    } else if (username.value.match(usernameReg)) {
        btn.setAttribute('style', '--msg: "Invalid Username";');
        errCount++;
    } else if (errCount > 0) { 
        btn.setAttribute('style', '--msg: "Please Enter All Fields Correctly";'); 
    } else if (errCount === 0) {
        form.setAttribute('action', btn.getAttribute('formaction'));
        form.submit();
    }
});