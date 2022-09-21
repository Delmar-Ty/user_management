const delBtn = document.querySelector('.delete');

btn.addEventListener('click', () => {
    form.setAttribute('formaction', btn.getAttribute('formaction'));
});

delBtn.addEventListener('click', () => {
    const del = confirm('Do you really want to delete your account? Your action cannot be undone 💔');
    if (del) {
        form.setAttribute('formaction', delBtn.getAttribute('formaction'));
        form.submit();
    }
});