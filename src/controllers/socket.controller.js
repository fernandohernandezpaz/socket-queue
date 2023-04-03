const ticketController = require('../controllers/ticket.controller');

const ticketControl = new ticketController();

const socketController = (socket) => {

    socket.emit('last-ticket', ticketControl.last);
    socket.emit('tickets-pending', ticketControl.tickets.length);
    socket.emit('current-status', ticketControl.lasts4);

    socket
        .on('next-ticket', (_, callback) => {
            const siguiente = ticketControl.nextTicket();
            callback(siguiente);
            socket.broadcast.emit('tickets-pending', ticketControl.tickets.length);
        })
        .on('attending-ticket', ({ desktop }, callback) => {
            console.log(1);
            if (!desktop) {
                return callback({
                    ok: false,
                    msg: 'El escritorio es requerido'
                });
            }

            const ticket = ticketControl.attendeeTicket(desktop);

            socket.broadcast.emit('current-status', ticketControl.lasts4);
            socket.emit('tickets-pending', ticketControl.tickets.length);
            socket.broadcast.emit('tickets-pending', ticketControl.tickets.length);

            if (!ticket) {
                return callback({
                    ok: false,
                    msg: 'Ya no hay tickets pendientes'
                });
            }

            callback({
                ok: true,
                ticket
            })
        });
}

module.exports = {
    socketController
}