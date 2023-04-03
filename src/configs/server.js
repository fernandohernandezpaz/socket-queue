require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const { socketController} = require('../controllers/socket.controller');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);
        this.socket();

        this.middlewares();

        this.routes();
    }

    routes() {

        // this.app.all('*', (req, res) => {
        //     res.status(404).send({
        //         error: 'Route not found',
        //     });
        // });
    }

    socket() {
        this.io.on('connection', socketController);
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.static(path.join(__dirname, '../..', 'public')));
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`The server is running in port ${this.port}`);
        });
    }
}

module.exports = Server;