const delBtn = document.querySelector('.delete');
const logBtn = document.querySelector('.log-out');

delBtn.addEventListener('click', () => {
    const del = confirm('Do you really want to delete your account? Your action cannot be undone 💔');
    if (del) {
        form.setAttribute('action', delBtn.getAttribute('formaction'));
        form.submit();
    }
});

logBtn.addEventListener('click', () => {
    location.href = 'http://localhost:8080/';
});