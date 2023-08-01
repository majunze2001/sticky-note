const socket = io();
const divEle = document.querySelector('div');
const noteEle = document.querySelector('#note');

socket.on("receive", (note) => {
    divEle.innerText = note;
});

document.querySelector('#note-form').addEventListener('submit', (e) => {
    e.preventDefault();
    socket.emit("write", noteEle.value);
})