module.exports = (io) => {
    //Para saber si hay algún usuarix conectadx
    io.on('connection', socket => {
        console.log("Nuevx usuarix conectadx.");
    })
}