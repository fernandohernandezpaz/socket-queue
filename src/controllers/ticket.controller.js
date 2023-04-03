const path = require('path');
const fs = require('fs');
const Ticket = require('../models/ticket.model');


class TicketController {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lasts4 = [];
        this.init();
    }


    get toJson() {
        return {
            "last": this.last,
            "today": this.today,
            "tickets": this.tickets,
            "lasts4": this.lasts4
        };
    }

    init() {
        const { today, tickets, last, lasts4 } = require('../../db/data.json');

        if (today === this.today) {
            this.tickets = tickets;
            this.last = last;
            this.lasts4 = lasts4;
        } else {
            this.saveDB();
        }
    }

    saveDB() {
        const dbPath = path.join(__dirname, '../..', 'db', 'data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
    }

    nextTicket() {
        this.last++;
        const ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);

        this.saveDB();
        return `Ticket ${ticket.ticketNumber}`;
    }

    attendeeTicket(desktop) {
        if (!this.tickets.length) return null;
        const ticket = this.tickets.shift();
        ticket.desktop = desktop;
        this.lasts4.unshift(ticket);
        if (this.lasts4.length > 4) {
            this.lasts4.splice(-1, 1);
        }
        this.saveDB();
        return ticket;
    }
}

module.exports = TicketController