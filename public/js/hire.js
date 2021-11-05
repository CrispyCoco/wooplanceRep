window.onload = () => {
    let buttonHire = document.querySelector('#btn_chatear');
    let hide = document.querySelector('#hire')
    buttonHire.addEventListener('click', () => {
        console.log('llegue aca');
        hide.style.display = 'block';
    })
}