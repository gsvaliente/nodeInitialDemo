const express = require('express')
const app = express()
    const port = 3000;
    app.use('/', express.static('public'));

    // TODO allow cors for localhost 3000 (dirección del cliente)
    // TODO middlewares
    // TODO rutes
    // TODO sockets

    app.listen(port, ()=> {
        console .log(`Xat client running on http://localhost:${port}`);
    })