const form = document.querySelector('.form');
const btn = document.querySelector('.btn');
const inputs = document.querySelectorAll('input');

btn.addEventListener('click', () => {
    let errCount = 0;
    btn.setAttribute('style', '--msg: "";');
    inputs.forEach((el) => {
        if (!el.value) {
            errCount++;
        }
    });
    if (errCount > 0) {
        btn.setAttribute('style', '--msg: "Please Enter All Fields Correctly";');
    } else {
        form.submit();
    }
});