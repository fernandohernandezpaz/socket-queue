const spanOnline = document.querySelector('#online');
const spanOffline = document.querySelector('#offline');
const txtMessage = document.querySelector('#txtMessage');
const btnSend = document.querySelector('#btnSend');

const socket = io();

socket
    .on(
        'connect', () => {
            console.log('Connected');
            spanOffline.style.display = 'none';
            spanOnline.style.display = '';
        }
    )
    .on(
        'disconnect', () => {
            console.log('Disconnected');
            spanOffline.style.display = '';
            spanOnline.style.display = 'none';
        }
    )
    .on(
        'enviar-mensaje', ({id, message}) => {
            console.log(({id, message}));
        }
    )


btnSend.addEventListener('click', () => {
    const message = txtMessage.value;
    const payload = {
        message,
        id: crypto.randomUUID().toString()
    }
    socket.emit('enviar-mensaje', payload,(id) => {
        console.log(`Callback ${id}`);
    });
})