const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');

const socket = io();

socket
    .on('connect', () => {
        btnCrear.disabled = false;
    })
    .on('disconnect', () => {
        btnCrear.disabled = true;
    })
    .on('last-ticket', (lastTicket) => {
        lblNuevoTicket.innerText = `Ticket ${lastTicket}`;
    });


btnCrear
    .addEventListener('click', () => {
        socket.emit('next-ticket', null, ( ticket ) => {
            lblNuevoTicket.innerText = ticket;
        });
    });