const ldlEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const smallTitle = document.querySelector('small');
const divAlert = document.querySelector('.alert');
const h1Pending = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('The desktop is required!');
}

const desktop = searchParams.get('escritorio');
ldlEscritorio.innerText = desktop;
divAlert.style.display = 'none'

const socket = io();

socket
    .on(
        'connect', () => {
            btnAtender.disabled = false;
        }
    )
    .on(
        'disconnect', () => {
            btnAtender.disabled = true;
        }
    )
    .on(
        'tickets-pending', (pending) => {
            if (pending === 0) {
                h1Pending.style.display = 'none';
                return ;
            }
            h1Pending.style.display = null;
            divAlert.style.display = 'none';
            h1Pending.innerText = pending;
        }
    );


btnAtender.addEventListener('click', () => {
    socket
        .emit('attending-ticket', { desktop }, ({ ok, msg, ticket }) => {
            if (!ok) {
                smallTitle.innerText = 'Nadie.';
                divAlert.style.display = null;
                return ;
            }
            smallTitle.innerText = `Ticket ${ticket.ticketNumber}`;
        });
});