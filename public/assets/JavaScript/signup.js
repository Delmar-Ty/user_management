const form = document.querySelector('.form');
const zip = document.querySelector('#zip');
const btn = document.querySelector('.btn');
const regZip = /\d{5}/;


btn.addEventListener('click', () => {
    let input = zip.value;
    if (input.match(regZip)) {
        console.log('Match');
        return;
    }
    console.log('No Match');
});