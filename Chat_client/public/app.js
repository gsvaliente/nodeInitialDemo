const express = require('express')
const app = express()
    const port = 3000;
    app.use('/', express.static('public'));

    // TODO allow cors for localhost 3000 (direccio del ciente)
    // TODO middlewares
    // TODO rutes
    // TODO sockets

    app.listen(port, ()=> {
        console .log(`xat client runninf on http://localhost:${port}`);
    })