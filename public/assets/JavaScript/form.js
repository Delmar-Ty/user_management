const form = document.querySelector('.form');
const zip = document.querySelector('#zip');
const btn = document.querySelector('.btn');
const pass = document.querySelectorAll('input[type="password"]');

const inputs = document.querySelectorAll('input');

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
    } else if (errCount > 0) { 
        btn.setAttribute('style', '--msg: "Please Enter All Fields Correctly";'); 
    } else if (errCount === 0) {
        form.submit();
    }
});